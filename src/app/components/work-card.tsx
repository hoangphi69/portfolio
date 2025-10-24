import Image from 'next/image';
import React from 'react';

function WorkCard({
  title,
  description,
  date,
  tags,
  src,
  width,
  height,
}: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  src: string;
  width: number;
  height: number;
}) {
  return (
    <div className="group space-y-4">
      <div className="rounded-lg group-hover:rounded-4xl w-full overflow-hidden transition-all duration-300">
        <Image
          className="size-full object-cover scale-101 group-hover:scale-100 transition-transform duration-300"
          src={src}
          width={width}
          height={height}
          alt=""
        />
      </div>

      <div className="flex gap-4">
        <Badge content={date} />
        <Badge content={tags} />
      </div>

      <div className="">
        <h3 className="font-semibold text-2xl uppercase">{title}</h3>
        <span className="text-foreground/80">{description}</span>
      </div>
    </div>
  );
}

function Badge({ content }: { content: string | string[] }) {
  const text = content instanceof Array ? content.join(' • ') : content;

  return (
    <span className="px-3 py-1 border border-foreground/30 rounded-full text-foreground/80 text-sm">
      {text}
    </span>
  );
}

export default WorkCard;
