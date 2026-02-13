import SocialStatCard from "@/components/SocialStatCard/SocialStatCard";
import EarningsCard from "@/components/(Cards)/EarningsCard/EarningsCard";
import HighlightsCard from "@/components/(Cards)/HighlightsCard/HighlightsCard";
import TeamMeetingCard from "@/components/(Cards)/TeamMeetingCard/TeamMeetingCard";
import { statsData } from "@/utils/data/socialStats.data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 min-h-screen p-4 md:p-8" style={{ backgroundColor: 'var(--md-sys-color-background)' }}>
      {/* <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap gap-7 w-full md:max-w-[386px]">
          {statsData.map((data, index) => (
            <SocialStatCard key={index} {...data} />
          ))}
        </div>
        <div className="w-full md:max-w-[800px]" />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap justify-between gap-7 w-full md:max-w-[386px]">
          <HighlightsCard />
        </div>
        <div className="w-full md:max-w-[800px]">
          <EarningsCard />
        </div>
      </div>

      <TeamMeetingCard /> */}
    </div>
  );
}
