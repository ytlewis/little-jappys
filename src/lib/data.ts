// Using realistic placeholder images from Unsplash

// Using realistic placeholder images from Unsplash
export const products = [
  { id: "p1", name: "Newborn Onesie", price: 1299, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop" },
  { id: "p2", name: "Feeding Bottle", price: 899, image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&h=400&fit=crop" },
  { id: "p3", name: "Teether Toy", price: 649, image: "https://images.unsplash.com/photo-1558877385-8c7f5e8d4b8e?w=400&h=400&fit=crop" },
  { id: "p4", name: "Baby Lotion", price: 999, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop" },
  { id: "p5", name: "Baby Pacifier", price: 499, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop" },
  { id: "p6", name: "Diaper Pack", price: 2499, image: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=400&fit=crop" },
];

export const sitters = [
  { id: "s1", name: "Amina K.", experience: "5 years exp.", rating: 5, image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces", bio: "Certified childcare provider who loves arts & crafts." },
  { id: "s2", name: "Grace M.", experience: "3 years exp.", rating: 4, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces", bio: "Early childhood education graduate, great with toddlers." },
  { id: "s3", name: "James O.", experience: "4 years exp.", rating: 5, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces", bio: "Patient and fun, specializes in special needs care." },
  { id: "s4", name: "Faith W.", experience: "6 years exp.", rating: 5, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces", bio: "Former preschool teacher with first-aid certification." },
];

export const parentingTips: Record<string, { title: string; content: string }[]> = {
  "0-6": [
    { title: "Tummy Time Tips", content: "Start with 3-5 minutes of tummy time a few times a day. Place colorful toys in front to encourage head lifting. Always supervise during tummy time and stop if baby becomes fussy." },
    { title: "Soothing a Colicky Baby", content: "Try the 5 S's: Swaddle, Side/stomach position, Shush, Swing, and Suck. White noise machines can also help. If colic persists beyond 3 months, consult your pediatrician." },
    { title: "Sleep Safety Basics", content: "Always place baby on their back to sleep. Use a firm, flat mattress with a fitted sheet. Keep soft objects and loose bedding out of the crib." },
  ],
  "6-12": [
    { title: "Introducing Solid Foods", content: "Start with single-ingredient purees like sweet potato, banana, or avocado. Introduce one new food every 3-5 days to watch for allergies. Let baby set the pace—don't force feeding." },
    { title: "Baby-Proofing Your Home", content: "Cover electrical outlets, secure furniture to walls, install baby gates at stairs, and lock cabinets with hazardous items. Get on your hands and knees to see the world from baby's perspective." },
    { title: "Encouraging First Words", content: "Talk to your baby often, narrating your daily activities. Read books together and point to pictures. Respond enthusiastically when baby babbles or attempts words." },
  ],
  "1-2": [
    { title: "Managing Toddler Tantrums", content: "Stay calm and patient. Acknowledge their feelings: 'I see you're upset.' Offer choices to give them a sense of control. Distraction and redirection work wonders at this age." },
    { title: "Healthy Toddler Meals", content: "Offer a variety of colorful foods in small portions. Make mealtimes fun with shaped cutters. Don't worry about messy eating—it's part of learning! Aim for 3 meals and 2-3 healthy snacks daily." },
    { title: "Potty Training Readiness", content: "Look for signs: staying dry for 2+ hours, showing interest in the toilet, telling you when their diaper is wet. Don't rush—every child develops at their own pace." },
  ],
};
