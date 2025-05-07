import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { OpenAI } from 'npm:openai@4.28.0';
import { createClient } from 'npm:@supabase/supabase-js@2.39.6';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  message: string;
  conversationId?: string;
  courseId?: string;
  moduleId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, conversationId, courseId, moduleId } = await req.json() as RequestBody;

    // Get user ID from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      throw new Error('Invalid token');
    }

    // Create or get conversation
    let activeConversationId = conversationId;
    if (!activeConversationId) {
      const { data: newConversation, error: conversationError } = await supabase
        .from('tutor_conversations')
        .insert({
          user_id: user.id,
          course_id: courseId,
          module_id: moduleId,
        })
        .select()
        .single();

      if (conversationError) {
        throw new Error('Failed to create conversation');
      }
      activeConversationId = newConversation.id;
    }

    // Save user message
    await supabase.from('tutor_messages').insert({
      conversation_id: activeConversationId,
      content: message,
      sender: 'user',
    });

    // Get conversation context
    let context = '';
    if (courseId && moduleId) {
      const { data: moduleData } = await supabase
        .from('course_modules')
        .select('content')
        .eq('id', moduleId)
        .single();
      
      if (moduleData) {
        context = `Context: The user is currently studying the following content:\n${moduleData.content}\n\n`;
      }
    }

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert AI tutor specializing in technology and computer science. 
          Your responses should be educational, clear, and engaging. Include examples and 
          analogies when helpful. If the user asks about topics you're not confident about, 
          admit it and suggest reliable sources for more information.
          
          ${context}`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    // Save AI response
    await supabase.from('tutor_messages').insert({
      conversation_id: activeConversationId,
      content: aiResponse,
      sender: 'ai',
    });

    return new Response(
      JSON.stringify({
        response: aiResponse,
        conversationId: activeConversationId,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});