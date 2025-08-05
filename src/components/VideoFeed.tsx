import { useState, useRef, useEffect } from "react";
import { Play, Pause, Heart, Share, MessageCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Video {
  id: number;
  title: string;
  creator: string;
  likes: number;
  comments: number;
  description: string;
  thumbnail: string;
}

const mockVideos: Video[] = [
  {
    id: 1,
    title: "Safe Driving Tips for Night Rides",
    creator: "@SafeDriver",
    likes: 1234,
    comments: 89,
    description: "Essential tips for driving safely at night. Always check your lights and mirrors!",
    thumbnail: "🌙"
  },
  {
    id: 2,
    title: "Best Routes in City Center",
    creator: "@CityExpert",
    likes: 2456,
    comments: 156,
    description: "Avoid traffic with these secret routes through downtown",
    thumbnail: "🏙️"
  },
  {
    id: 3,
    title: "Customer Service Excellence",
    creator: "@TopDriver",
    likes: 3567,
    comments: 234,
    description: "How to maintain 5-star ratings with great customer service",
    thumbnail: "⭐"
  },
  {
    id: 4,
    title: "Fuel Efficiency Hacks",
    creator: "@EcoDriver",
    likes: 1890,
    comments: 67,
    description: "Save money on gas with these simple driving techniques",
    thumbnail: "⛽"
  },
  {
    id: 5,
    title: "Peak Hours Strategy",
    creator: "@RushHourPro",
    likes: 4123,
    comments: 298,
    description: "Maximize earnings during busy times of the day",
    thumbnail: "🚗"
  }
];

const VideoFeed = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const videoHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const newCurrentVideo = Math.round(scrollTop / videoHeight);
      
      setCurrentVideo(newCurrentVideo);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleLike = (videoId: number) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const scrollToVideo = (index: number) => {
    if (containerRef.current) {
      const videoHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * videoHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative h-full w-full">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mockVideos.map((video, index) => (
          <div 
            key={video.id}
            className="h-full w-full snap-start relative flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border"
          >
            {/* Video Thumbnail/Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl opacity-20">{video.thumbnail}</div>
            </div>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/10 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying && currentVideo === index ? (
                <Pause className="h-16 w-16 text-white drop-shadow-lg" />
              ) : (
                <Play className="h-16 w-16 text-white drop-shadow-lg" />
              )}
            </Button>

            {/* Video Info */}
            <div className="absolute bottom-4 left-4 right-16 text-white">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight">{video.title}</h3>
                <p className="text-sm opacity-90">{video.creator}</p>
                <p className="text-sm opacity-75 line-clamp-2">{video.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 text-white"
                onClick={() => toggleLike(video.id)}
              >
                <Heart 
                  className={`h-6 w-6 ${likedVideos.has(video.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
              <div className="text-center text-white text-xs font-medium">
                {likedVideos.has(video.id) ? video.likes + 1 : video.likes}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 text-white"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              <div className="text-center text-white text-xs font-medium">
                {video.comments}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 text-white"
              >
                <Share className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 text-white"
              >
                <MoreVertical className="h-6 w-6" />
              </Button>
            </div>

            {/* Video Progress Indicators */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
              {mockVideos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToVideo(i)}
                  className={`w-1 h-8 rounded-full transition-colors ${
                    i === currentVideo ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;