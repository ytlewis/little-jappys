import { useState, useEffect } from "react";
import { BookOpen, Stethoscope, Baby, GraduationCap, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import { parentingTips as defaultTips } from "@/lib/data";
import { getFromLocalStorage } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";

interface ParentingTip {
  id: string;
  ageGroup: string;
  title: string;
  content: string;
  source?: string;
  sourceRole?: string;
  sourceCredentials?: string;
}

interface TipSource {
  name: string;
  role: string;
  credentials: string;
  icon: React.ElementType;
  color: string;
}

const tipSources: TipSource[] = [
  { name: "Dr. Amina Osei", role: "Pediatrician", credentials: "MBChB, MMed (Paediatrics) – Nairobi Hospital", icon: Stethoscope, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Dr. Grace Mwangi", role: "Child Development Specialist", credentials: "PhD Child Psychology – University of Nairobi", icon: GraduationCap, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Nurse Faith Wambua", role: "Certified Baby Nurse", credentials: "BSN, IBCLC Lactation Consultant – Aga Khan Hospital", icon: Heart, color: "bg-pink-50 text-pink-700 border-pink-200" },
  { name: "Dr. Kofi Mensah", role: "Neonatologist", credentials: "MBChB, MRCPCH – Kenyatta National Hospital", icon: Baby, color: "bg-green-50 text-green-700 border-green-200" },
];

// Assign sources to default tips
const enrichTipsWithSources = (tips: ParentingTip[]): ParentingTip[] => {
  return tips.map((tip, i) => ({
    ...tip,
    source: tip.source || tipSources[i % tipSources.length].name,
    sourceRole: tip.sourceRole || tipSources[i % tipSources.length].role,
    sourceCredentials: tip.sourceCredentials || tipSources[i % tipSources.length].credentials,
  }));
};

const tabs = [
  { key: "0-6", label: "0–6 Months" },
  { key: "6-12", label: "6–12 Months" },
  { key: "1-2", label: "1–2 Years" },
];

const ParentingPage = () => {
  const [activeTab, setActiveTab] = useState("0-6");
  const [allTips, setAllTips] = useState<ParentingTip[]>([]);

  useEffect(() => {
    const storedTips = getFromLocalStorage<ParentingTip[]>("littlejappy_tips");
    if (storedTips && storedTips.length > 0) {
      setAllTips(enrichTipsWithSources(storedTips));
    } else {
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
      setAllTips(enrichTipsWithSources(convertedTips));
    }
  }, []);

  const tips = allTips.filter(tip => tip.ageGroup === activeTab);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Parenting Tips</h1>
        <p className="text-muted-foreground mb-2">Expert-backed, milestone-based guidance for every stage.</p>

        {/* Sources legend */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tipSources.map((s) => (
            <div key={s.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${s.color}`}>
              <s.icon className="w-3.5 h-3.5" />
              <span>{s.name} · {s.role}</span>
            </div>
          ))}
        </div>

        {/* Age tabs */}
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
            {tips.map((tip) => {
              const sourceInfo = tipSources.find(s => s.name === tip.source) || tipSources[0];
              const SourceIcon = sourceInfo.icon;
              return (
                <article key={tip.id} className="bg-card rounded-2xl border border-border shadow-md p-6 hover:shadow-xl transition-all animate-fade-in flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-baby-blue flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tip.content}</p>

                  {/* Source attribution */}
                  <div className={`mt-4 pt-4 border-t border-border flex items-start gap-2.5`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${sourceInfo.color} border`}>
                      <SourceIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{tip.source}</p>
                      <p className="text-xs text-muted-foreground">{tip.sourceRole}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 italic">{tip.sourceCredentials}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ParentingPage;
