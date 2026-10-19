export type Service = { title: string; problem: string; solution: string };
export type Category = { id: string; short: string; label: string; proof: string; description: string; services: Service[] };
export const categories: Category[] = [
  { id: 'customer-support', short: 'Customer Support', label: 'Customer Support', proof: '85% client retention', description: "Customer support outsourcing for businesses whose customers expect a fast, correct answer. Agents work in your CRM and reply in your company's name.", services: [
    {title:'Inbound call support',problem:'Calls go unanswered at busy times, or customers wait on hold and hang up.',solution:'Trained call centre agents answer incoming calls, so customers wait less and get accurate answers.'},
    {title:'Outbound call support',problem:'Follow-up and survey calls never get made because nobody has time.',solution:'Agents make follow-up and survey calls from scripts written for your customers, and nurture leads until they are ready to buy.'},
    {title:'Customer service',problem:'Customers contact you by phone, email and chat and expect the same answer on each.',solution:"One team covers every channel in English, Sinhala, Tamil and Hindi, with one set of facts and one tone of voice."},
    {title:'Customer retention',problem:'Customers buy once, then switch to a competitor.',solution:'Regular check-ins and loyalty programmes keep customers buying, so each one spends more over time.'},
    {title:'Complaint and query handling',problem:'Complaints pass between staff and take days to close.',solution:'A dedicated team handles each complaint from start to finish and keeps the customer updated. Complaints close in less time.'}
  ]},
  { id: 'back-office', short: 'BPO & Back Office', label: 'BPO & Back Office', proof: '98% accuracy', description:'Back office outsourcing for data, documents and compliance work that has to be right the first time. Software checks are paired with human review.', services: [
    {title:'Data entry and processing',problem:'Staff spend hours copying data from one system to another.',solution:'Records are entered with software tools and checked by hand. You get clean data sooner and pay less to process it.'},
    {title:'Document processing',problem:'Contracts, forms and invoices sit in folders that are hard to search or audit.',solution:'Documents are digitised and checked for compliance, then stored securely for when an auditor asks.'},
    {title:'Data verification and validation',problem:'Duplicate or wrong records lead to poor decisions and missed fraud.',solution:'Each record goes through several checks, by software and by people, before you rely on it.'},
    {title:'Compliance, KYC and AML support',problem:'KYC checks delay new customer sign-ups.',solution:'Specialists run KYC and AML checks with automated tools and audit-ready reports. New customers start sooner and regulatory risk drops.'},
    {title:'Lead generation',problem:'Your sales team spends more time searching for leads than talking to them.',solution:'Targeted campaigns built on verified data, with follow-up until each lead is ready for a sales conversation.'},
    {title:'Back office operations',problem:'Routine admin grows with every new customer.',solution:'A team sized to your workload handles daily admin to agreed SLAs, so overheads stay under control as you grow.'},
    {title:'Virtual assistant services',problem:"Calendars and inbox replies fill managers' mornings.",solution:'A personal assistant manages scheduling and client emails, so managers can use their mornings for other work.'}
  ]},
  { id: 'it-services', short: 'IT Services', label: 'IT Services', proof: '20+ websites built & maintained', description:'IT support services and web development for businesses that depend on their website and systems. Build something new, keep what you have running, or both.', services: [
    {title:'Web development',problem:'You need a new website, or the current one is slow, dated or hard to update.',solution:'Brand-new custom websites built on modern frameworks, designed to load fast and turn visitors into enquiries.'},
    {title:'Website maintenance',problem:'Nobody is responsible for updates, security patches or checking that the site is up.',solution:'The team handles all of it on a regular schedule, so your site stays safe and online.'},
    {title:'IT support',problem:'Staff lose hours waiting for laptops, logins and systems to be fixed.',solution:'Remote troubleshooting and ongoing monitoring cut downtime, so staff get back to work sooner.'},
    {title:'Technical support',problem:'Your developers answer the same customer questions every day.',solution:'A trained helpdesk handles software and hardware queries, so fewer issues are escalated and customers keep using your product.'}
  ]}
];
export const questions = [
 {q:'How do you make sure the work is right?',a:'All work gets a QA score across every service, and each team member has a monthly performance review with coaching. Only 15 to 20% of job applicants pass the hiring checks.',tag:'QA checks'},
 {q:'How quickly can a team start?',a:'Most teams are ready within two to four weeks of signing, including training on your processes.',tag:'2–4 weeks'},
 {q:'Is there a minimum contract?',a:'Contracts start from three months. Longer terms are available for larger teams.',tag:'3 months'},
 {q:'How is pricing worked out?',a:'Pricing depends on the services, the hours you need covered and the size of the team. You get a written quotation after the discovery call.',tag:'Tailored quote'},
 {q:'How is our data protected?',a:'Access is limited to the people who need it, and every team member is trained on data handling and confidentiality. Systems follow current cybersecurity practices, including encrypted connections, two-factor login and regular security updates.',tag:'Security'}
];
