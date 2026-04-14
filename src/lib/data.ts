// Local product images
import productOnesie from "@/assets/product-onesie.png";
import productBottle from "@/assets/product-bottle.png";
import productTeether from "@/assets/product-teether.png";
import productLotion from "@/assets/product-lotion.png";
import productPacifier from "@/assets/product-pacifier.png";
import productBlanket from "@/assets/product-blanket.png";
import productWoodenBlocks from "@/assets/product-stroller.png";
import productRockingChair from "@/assets/product-bathset.png";

export const products = [
  {
    id: "p1",
    name: "Newborn Onesie",
    price: 1299,
    category: "Clothing",
    description: "Soft cotton onesie perfect for newborns, gentle on delicate skin.",
    image: productOnesie,
  },
  {
    id: "p2",
    name: "Feeding Bottle",
    price: 899,
    category: "Feeding",
    description: "Anti-colic feeding bottle with slow-flow nipple, BPA-free.",
    image: productBottle,
  },
  {
    id: "p3",
    name: "Teether Toy",
    price: 649,
    category: "Toys",
    description: "Safe silicone teether to soothe sore gums during teething.",
    image: productTeether,
  },
  {
    id: "p4",
    name: "Baby Lotion",
    price: 999,
    category: "Skincare",
    description: "Gentle moisturizing lotion formulated for sensitive baby skin.",
    image: productLotion,
  },
  {
    id: "p5",
    name: "Baby Pacifier",
    price: 499,
    category: "Feeding",
    description: "Orthodontic pacifier designed to support natural oral development.",
    image: productPacifier,
  },
  {
    id: "p6",
    name: "Baby Blanket",
    price: 1599,
    category: "Essentials",
    description: "Cozy, breathable swaddle blanket to keep your baby warm and snug.",
    image: productBlanket,
  },
  {
    id: "p7",
    name: "Wooden Building Blocks",
    price: 1899,
    category: "Toys",
    description: "Colorful wooden building blocks set to spark creativity and develop motor skills in toddlers.",
    image: productWoodenBlocks,
  },
  {
    id: "p8",
    name: "Baby Rocking Chair",
    price: 12999,
    category: "Furniture",
    description: "Comfortable wooden rocking chair perfect for nursing and bonding with your newborn.",
    image: productRockingChair,
  },
  {
    id: "p9",
    name: "Silicone Teether Ring",
    price: 750,
    category: "Toys",
    description: "BPA-free silicone ring teether with easy grip handles, dishwasher safe.",
    image: productTeether,
  },
  {
    id: "p10",
    name: "Wide-Neck Bottle Set",
    price: 1599,
    category: "Feeding",
    description: "Set of 3 wide-neck anti-colic bottles, easy to clean and assemble.",
    image: productBottle,
  },
  {
    id: "p11",
    name: "Soother & Clip Set",
    price: 699,
    category: "Feeding",
    description: "2 orthodontic soothers with a hygienic clip to keep them off the floor.",
    image: productPacifier,
  },
  {
    id: "p12",
    name: "Baby Romper Suit",
    price: 1499,
    category: "Clothing",
    description: "Soft, breathable cotton romper with snap buttons for easy diaper changes.",
    image: productOnesie,
  },
];


export const sitters = [
  {
    id: "s1",
    name: "Amina K.",
    experience: "5 years exp.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces",
    bio: "Certified childcare provider who loves arts & crafts.",
  },
  {
    id: "s2",
    name: "Grace M.",
    experience: "3 years exp.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=400&fit=crop&crop=faces",
    bio: "Early childhood education graduate, great with toddlers.",
  },
  {
    id: "s3",
    name: "Kofi O.",
    experience: "4 years exp.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    bio: "Patient and fun, specializes in special needs care.",
  },
  {
    id: "s4",
    name: "Faith W.",
    experience: "6 years exp.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=400&fit=crop&crop=faces",
    bio: "Former preschool teacher with first-aid certification.",
  },
  {
    id: "s5",
    name: "Chidi N.",
    experience: "2 years exp.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=400&fit=crop&crop=faces",
    bio: "Energetic and creative, loves storytelling and outdoor play.",
  },
  {
    id: "s6",
    name: "Zara A.",
    experience: "7 years exp.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=faces",
    bio: "Experienced nanny with a background in early childhood nutrition.",
  },
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
