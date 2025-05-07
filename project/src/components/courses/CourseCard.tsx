import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, BarChart } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  progressPercentage?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progressPercentage }) => {
  const navigate = useNavigate();

  const difficultyColor = {
    beginner: 'success',
    intermediate: 'accent',
    advanced: 'error'
  } as const;
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${mins} min`;
    }
  };
  
  return (
    <Card 
      isHoverable
      className="h-full flex flex-col"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <Badge 
            variant={difficultyColor[course.difficulty]}
            size="md"
          >
            {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-neutral-900">{course.title}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>
        
        <div className="flex justify-between items-center text-sm text-neutral-500">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            <span>{course.modules.length} modules</span>
          </div>
        </div>
        
        {progressPercentage !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm font-medium text-neutral-700">Progress</div>
              <div className="text-sm font-medium text-neutral-700">{progressPercentage}%</div>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          {course.topics.slice(0, 3).map((topic, index) => (
            <Badge key={index} variant="default" size="sm">
              {topic}
            </Badge>
          ))}
          {course.topics.length > 3 && (
            <Badge variant="default" size="sm">
              +{course.topics.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;