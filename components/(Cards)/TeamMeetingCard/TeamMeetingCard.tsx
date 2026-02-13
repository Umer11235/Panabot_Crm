import UniversalCard from "../UniversalCard/UniversalCard";

export default function TeamMeetingCard() {
  return (
    <UniversalCard title="Team Meeting" actionType="button">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <span className="text-lg font-bold">09:00 - 09:30</span>
          <div className="bg-blue-500 p-2 rounded-full text-white">🔹</div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed">
          Team meeting to discuss strategies, outline project milestones, and establish clear timelines.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block mb-1">Location</span>
            <span className="font-semibold text-sm">Amsterdam</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block mb-1">Team</span>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`/avatar-${i}.jpg`} className="w-8 h-8 rounded-full border-2 border-white" alt={`Avatar ${i}`} />
              ))}
              <div className="w-8 h-8 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center border-2 border-white">
                +10
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-3 text-blue-600 font-bold border-t border-gray-100 mt-2 hover:underline">
          Join Meeting
        </button>
      </div>
    </UniversalCard>
  );
}
