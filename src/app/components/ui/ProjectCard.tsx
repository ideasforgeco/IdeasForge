import Image from "next/image";

interface ProjectCardProps {
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export default function ProjectCard({
  name,
  description,
  image,
  tags,
}: ProjectCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md w-[300px] sm:w-[500px] lg:w-[550px] h-auto !p-[3px]"
      style={{
        background: "linear-gradient(135deg, #B352F4, #EF3AA5)",
      }}
    >
      <div className="bg-[#FDDFD3] rounded-xl overflow-hidden !p-3 h-full">
        {/* Project Image */}
        <div className="relative h-[350px] w-full">
          <Image src={image} alt={name} fill className="rounded-lg shadow-md" />
        </div>

        {/* Project Info */}
        <div className="!p-6 bg-white rounded-lg shadow-md !mt-2">
          {/* Project Name */}
          <h4 className="font-bold text-[20px] text-[#4B4C4D] !mb-2">{name}</h4>

          {/* Description */}
          <p className="text-[14px] sm:text-[16px] text-[#757575] leading-relaxed !mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="shadow-md text-[14px] font-semibold rounded-lg !p-[2px]"
                style={{
                  background: "linear-gradient(135deg, #B352F4, #EF3AA5)",
                }}
              >
                <span className="bg-white text-[#4B4C4D] !px-3 !py-1 rounded-md block">
                  {tag}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
