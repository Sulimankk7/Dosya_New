export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6"
    >
      <div
        className="max-w-5xl mx-auto
                   border border-gray-200 dark:border-white/10
                   rounded-2xl
                   bg-white dark:bg-[#020617]
                   px-6 py-12 sm:px-10 text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          من نحن
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          نحن مشروع بدأ من تجربة جامعية حقيقية.
          <br /><br />
          كطلاب، واجهنا نفس التحديات اللي يمر فيها كثير غيرنا: دوسيات غير مرتبة،
          مصادر مشتتة، شرح غير واضح، وأحيانًا تكلفة لا تعكس جودة المحتوى.
          <br /><br />
          من هون بدأت الفكرة. بدل ما نكمّل بنفس الدائرة، قررنا نعمل إشي أنظف،
          أوضح، وأسهل للطالب.
          <br /><br />
          اشتغلنا على إعداد دوسيات منظمة، محتواها دقيق، ومبنية على فهم فعلي
          للمادة، مش مجرد تجميع أوراق. كان هدفنا – ولسه – إن الطالب يوصل
          للمعلومة بسرعة، يفهمها، ويقدر يعتمد عليها بثقة.
          <br /><br />
          مشروعنا مش مجرد دوسيات، هو محاولة لتقديم تجربة دراسية أفضل،
          نابعة من طالب… وموجّهة للطالب.
        </p>
      </div>
    </section>
  );
}
