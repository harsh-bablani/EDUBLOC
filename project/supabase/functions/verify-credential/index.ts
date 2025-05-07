import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { ethers } from 'npm:ethers@6.11.1';
import { createClient } from 'npm:@supabase/supabase-js@2.39.6';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  credentialId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { credentialId } = await req.json() as RequestBody;

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

    // Get credential
    const { data: credential, error: credentialError } = await supabase
      .from('credentials')
      .select('*')
      .eq('id', credentialId)
      .eq('user_id', user.id)
      .single();

    if (credentialError || !credential) {
      throw new Error('Credential not found');
    }

    // Mock blockchain verification
    // In a real implementation, this would verify the credential against a smart contract
    const wallet = ethers.Wallet.createRandom();
    const message = `Verify credential: ${credential.id}`;
    const signature = await wallet.signMessage(message);
    const isValid = ethers.verifyMessage(message, signature) === wallet.address;

    if (isValid) {
      // Update credential status
      await supabase
        .from('credentials')
        .update({ status: 'verified' })
        .eq('id', credentialId);

      return new Response(
        JSON.stringify({ verified: true, signature }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      throw new Error('Credential verification failed');
    }
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