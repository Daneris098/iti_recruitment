export function SkillChip({ skill }: { skill: string }) {
    return (
        <p className="flex rounded-[10px] text-[#6D6D6D] bg-[#D9D9D9] w-auto px-3 h-[21px] font-semibold text-[12px] items-center justify-center">
            {skill}
        </p>
    );
}
