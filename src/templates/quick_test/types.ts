export type QuickTestData = {
  question: string;
  options: string[];
  correctIndex: number; // options içindeki doğru şıkkın index'i (0=A, 1=B, 2=C...)
  meaning: string;      // doğru kelimenin Arapça anlamı ("انا شبعان" gibi)
};