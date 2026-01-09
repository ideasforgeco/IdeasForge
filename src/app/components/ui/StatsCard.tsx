interface StatsCardProps {
    value: string;
    label: string;
}

export default function StatsCard({ value, label }: StatsCardProps) {
    return (
        <div
            className=" flex items-center justify-center flex-col shadow-md gap-[5px] sm:gap-[8px] rounded-[17px] bg-white w-[280px] sm:w-[313px] h-[85px] sm:h-[127px]"
            style={{
                border: '1px solid transparent',
                borderBottom: '2.5px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #FECB32, #F55D22)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
            }}
        >
            <h1
                className="font-semibold text-2xl sm:text-[40px] leading-[100%] text-center bg-gradient-to-r from-[#FECB32] to-[#F55D22] bg-clip-text text-transparent"
            >
                {value}
            </h1>
            <p className=" text-sm sm:text-[18px] text-[#4B4C4D] text-center whitespace-nowrap">
                {label}
            </p>
        </div>
    );
}