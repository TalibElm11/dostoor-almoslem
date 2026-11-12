const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
const tasks = [...document.querySelectorAll("#weeklyTasks input[type=checkbox]")];
const progress = document.getElementById("taskProgress");
function updateProgress() {
  const count = tasks.filter(task => task.checked).length;
  const arabic = String(count).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
  progress.textContent = `أنجزت ${arabic} من ٧`;
}
tasks.forEach(task => task.addEventListener("change", updateProgress));
const searchable = [
  {title:"القرآن الكريم: هداية تُعاش", text:"تفسير القرآن التدبر الهدايات التطبيق العملي سورة الفاتحة"},
  {title:"سورة الفاتحة", text:"الحمد لله رب العالمين الرحمن الرحيم مالك يوم الدين إياك نعبد وإياك نستعين اهدنا الصراط المستقيم"},
  {title:"السنة النبوية الصحيحة", text:"الأحاديث الصحيحة والحسنة التخريج الشرح الفوائد التطبيق"},
  {title:"العقيدة والتوحيد", text:"الإيمان التوحيد أسماء الله وصفاته"},
  {title:"تزكية النفس", text:"القلب الإخلاص التوبة الصبر الشكر مراقبة الله الاستقامة"},
  {title:"فقه المواقف والمشكلات", text:"الحياة اليومية الأسرة العمل المال العلاقات اتخاذ القرار"}
];
document.getElementById("searchForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const term = document.getElementById("searchInput").value.trim().toLowerCase();
  const target = document.getElementById("searchResults");
  if (!term) { target.textContent = "اكتب كلمة أو موضوعًا للبحث."; return; }
  const matches = searchable.filter(item => (item.title + " " + item.text).toLowerCase().includes(term));
  target.innerHTML = matches.length
    ? "نتائج مقترحة: " + matches.map(item => `<a href="#${item.title.includes("الفاتحة") || item.title.includes("القرآن") ? "fatiha" : item.title.includes("السنة") ? "sunnah" : "sections"}">${item.title}</a>`).join(" · ")
    : "لم نعثر على نتيجة في المحتوى التجريبي الحالي. جرّب كلمة أخرى.";
});
