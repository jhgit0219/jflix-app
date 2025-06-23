"use client";

export default function MovieCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="min-w-[calc(100%/2.2)] sm:min-w-[calc(100%/3.2)] md:min-w-[calc(100%/5.2)] lg:min-w-[calc(100%/6.2)] xl:min-w-[calc(100%/6.5)] flex-shrink-0 aspect-video rounded overflow-hidden relative bg-surface hover:scale-105 transition-transform duration-200">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}
