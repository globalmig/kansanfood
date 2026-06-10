import { FiPhone, FiMail } from "react-icons/fi";

const contacts = [
  {
    label: "이메일",
    value: "contact@kansanfood.com",
    href: "mailto:contact@kansanfood.com",
    desc: "문의 주시면 24시간 이내 답변드립니다.",
    icon: <FiMail size={18} />,
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="h-20 bg-zinc-900" />

      <section className="bg-white py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-4">
            Contact Us
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-4">
            문의하기
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed mb-14">
            B2B 납품·파트너십·제품 문의는 아래 연락처로 언제든지 편하게 연락 주세요.
          </p>

          <div className="space-y-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-start gap-6 border border-zinc-200 hover:border-red-300 hover:shadow-md bg-white rounded-2xl p-8 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-red-500 flex items-center justify-center shrink-0 transition-colors duration-300 text-red-500 group-hover:text-white">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold tracking-widest uppercase mb-1">{c.label}</p>
                  <p className="text-xl font-bold text-zinc-900 mb-1 group-hover:text-red-500 transition-colors duration-300">{c.value}</p>
                  <p className="text-sm text-zinc-400">{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
