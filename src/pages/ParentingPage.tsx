import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import { parentingTips as defaultTips } from "@/lib/data";
import { getFromLocalStorage } from "@/lib/storage";

interface ParentingTip {
  id: string;
  ageGroup: string;
  title: string;
  content: string;
}

const tabs = [
  { key: "0-6", label: "0–6 Months" },
  { key: "6-12", label: "6–12 Months" },
  { key: "1-2", label: "1–2 Years" },
];

const ParentingPage = () => {
  const [activeTab, setActiveTab] = useState("0-6");
  const [allTips, setAllTips] = useState<ParentingTip[]>([]);

  useEffect(() => {
    // Load tips from localStorage (admin-managed)
    const storedTips = getFromLocalStorage<ParentingTip[]>("littlejappy_tips");
    if (storedTips && storedTips.length > 0) {
      setAllTips(storedTips);
    } else {
      // Convert default tips to the new format
      const convertedTips: ParentingTip[] = [];
      Object.entries(defaultTips).forEach(([ageGroup, tips]) => {
        tips.forEach((tip, index) => {
          convertedTips.push({
            id: `${ageGroup}-${index}`,
            ageGroup,
            title: tip.title,
            content: tip.content,
          });
        });
      });
      setAllTips(convertedTips);
    }
  }, []);

  // Filter tips by active tab
  const tips = allTips.filter(tip => tip.ageGroup === activeTab);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Parenting Tips</h1>
        <p className="text-muted-foreground mb-8">Milestone-based guidance for every stage.</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tips available for this age group yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <article key={tip.id} className="bg-card rounded-2xl border border-border shadow-md p-6 hover:shadow-xl transition-all animate-fade-in">
                <div className="w-10 h-10 rounded-lg bg-baby-blue flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{tip.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{tip.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ParentingPage;
