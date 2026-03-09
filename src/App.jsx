import React, { useState, useMemo } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award, Network, ShieldAlert, Home, BookOpen, ArrowLeft } from "lucide-react";

// Dataset 1: Final Exam OT
const finalExamData = [
  { q: "One of its benefits is the use of multiple NMSs to eliminate single point of failure", a: "Distributed Network Management" },
  { q: "NM software architecture which provide interfaces between user and NM software", a: "User Presentation Software" },
  { q: "A NM software architecture which includes a set of NM applications, application elements and NM data transport service", a: "Network Management Software" },
  { q: "A collection of software for performing network monitoring and control", a: "Network Management Applications" },
  { q: "A collection of software devoted to the network management tasks", a: "Network Management Entity" },
  { q: "Concerned with charging the use of network resources", a: "Accounting Management" },
  { q: "Concerned with monitoring the status of the components during network operation", a: "Configuration Management" },
  { q: "Concerned with ensuring that the system as a whole, and each essential component individually are in proper working order", a: "Fault Management" },
  { q: "Concerned with observing and analyzing the status and behavior of the end systems, intermediate systems, and sub network that make up the network to be managed", a: "Network monitoring" },
  { q: "Not a part of the monitored types of information", a: "Derived Information" },
  { q: "Monitoring system components except", a: "Sub network or Internet" },
  { q: "A monitoring system components that performs the basic monitoring function of retrieving information", a: "Manager Function" },
  { q: "A monitoring system component that gathers and record management information for one or more network elements and delivers the information to the monitor", a: "Agent Function" },
  { q: "A monitoring system component that manage information that represents resources and their activities", a: "Managed Object" },
  { q: "A monitoring system component that generates summaries and statistical analysis of management information", a: "Monitoring Agent" },
  { q: "A network monitoring method where a manager send a request to an agent which process the request and responds with information from its MIB", a: "Polling" },
  { q: "A network monitoring methods where information flow is initiated from an agent to manager", a: "Event Reporting" },
  { q: "Network performance indicators which deals with availability, response time, and accuracy", a: "Service Oriented" },
  { q: "Throughput and utilization are components of this network performance indicator", a: "Efficiency Oriented" },
  { q: "All of the following are performance monitoring functions except", a: "Controlled Environment Area" },
  { q: "Which is not a component of a fault monitoring function", a: "Testing" },
  { q: "A machine independent data description language", a: "ASN.1" },
  { q: "A notation is used to define MOs and the entire MIB structure", a: "ASN.1" },
  { q: "Describes a method for encoding values of each ASN.1 type as a string of octets and is based on the use of type-length-value (TLV) structure", a: "BER" },
  { q: "It is widely used and standard encoding scheme", a: "BER" },
  { q: "Describes the generic structure of data and allows data types and values to be defined", a: "Abstract Syntax" },
  { q: "Describes how data are actually represented in terms of bit patterns while in transit", a: "Transfer syntax" },
  { q: "Sequence of octets used to represent a data value", a: "Encoding" },
  { q: "Concerned with modifying parameters in and causing actions to be taken by the end systems, intermediate systems and sub networks that make up the network to be managed", a: "Network Control" },
  { q: "All should be secured in a network except", a: "Users" },
  { q: "A security requirement for making information accessible to only authorized users and includes the hiding of the existence of information", a: "Secrecy" },
  { q: "A security requirement for making information modifiable to only authorized users", a: "Integrity" },
  { q: "A security threat where an entity pretends to be a different entity", a: "Masquerade" },
  { q: "Which among the following is a security threat to availability", a: "Integrity" },
  { q: "A security threat where an unauthorized party inserts false information", a: "Fabrication" },
  { q: "All of the following are network assets except", a: "Bandwidth" },
  { q: "Network assets that is prone only to interruptions like theft and denial of service", a: "Hardware" },
  { q: "Collection of moderate number of variables that may be of different type and whose order is significant", a: "Sequence" },
  { q: "Also referred to as SNMP-based Network Management", a: "Internet Network Management" },
  { q: "An organization responsible for SNMP standardization", a: "IETF" },
  { q: "Ping utility is an example of this internet protocol", a: "ICMP" },
  { q: "Known to be interim solution and enhanced version of SGMP", a: "SNMP" },
  { q: "Referred to a document that is replaced by an updated version", a: "Obsolete" },
  { q: "By means of --- the agent occasionally notifies the manager about some events related to network operation", a: "Trap" },
  { q: "All are types of ASN.1 universal types except", a: "Counter" },
  { q: "An SNMP operations that retrieves management information", a: "GET operation" },
  { q: "An SNMP operation that updates management information", a: "SET operation" },
  { q: "An SNMP security concept where agent may wish to give different access privileges to different managers", a: "Access Policy" },
  { q: "An SNMP security concept where agent may wish to limit access to the MIB to authorized managers", a: "Authentication Service" },
  { q: "It is used for accessing MIB objects serially", a: "Lexicographical ordering" },
  { q: "What does ITU stands for", a: "International Telecommunication Union" },
  { q: "What does EIA stands for", a: "Electronic Industries Association" },
  { q: "What does TIA stands for", a: "Telecommunication Industries Association" },
  { q: "What does DMTF stands for", a: "Distributed Management Task Force" }
];

// Dataset 2: Quiz 2
const quiz2Data = [
  { q: "An HTTP operation that is used to retrieve information from the server and the response contains the information requested by the client", a: "GET" },
  { q: "An SNMP operation that updates management information", a: "SET operation" },
  { q: "What is the problem cause if devices is not forming adjacencies with other devices", a: "neighbor issues" },
  { q: "Analogy: SNMP - IETF : : DMTF", a: "DMI" },
  { q: "It specifies the format used for defining managed objects that are accessed via SNMP protocol", a: "SMI" },
  { q: "A network property that fulfills users anticipations for keeping the network continuously on", a: "Resiliency" },
  { q: "Another term applied to lexicographical ordering or depth-first-search", a: "Serial Access" },
  { q: "This operation is also atomic and contains the same request-id used for reply. A possible error-status includes noSuchName, tooBig, and genErr plus", a: "GetRequest PDU" },
  { q: "It can be used to describe the flow of packets within the individual layers and make sure that every PDU received at a layer or issued from a layer is accounted for", a: "SNMP Statistics" },
  { q: "It allows NSM to discover the structure of a MIB view dynamically. It also provides an efficient mechanism for searching a table whose entries are unknown", a: "GetNextRequest PDU" },
  { q: "Which of the following protocols does not connect devices or applications and management services", a: "DMI" },
  { q: "It provides the second line of security protection in SNMP and determine the rights that a management stations has relative to MIB objects", a: "Authorization" },
  { q: "An SNMP community where an agent can provide different categories of MIB access using the following concepts: MIB MIB view and Access Mode", a: "SNMP Access Policy" },
  { q: "It is a characteristics of a switch when the systems/network administrators consider the number of possible connections on a layer 2 device", a: "Port Density" },
  { q: "In a Layer 2 switch, (blank) is the data rate that the GigaEthernet 0/1 is cable of reaching", a: "Wire Speed" },
  { q: "It extends the SNMPv1 MIB functions", a: "RMON1" },
  { q: "A hierarchical network function that combines Data-Link layer broadcast domains and network layer routing limitations", a: "Distribution Layer" },
  { q: "A network activity whose objective is to observe network activities in comparison with the predefined baseline", a: "Network Monitoring" },
  { q: "It is issued by an SNMP agent to notify the NMS of some significant event", a: "Trap PDU" },
  { q: "It is command used to carry back the value(s) or signal of actions directed by the SNMP Manager", a: "response" },
  { q: "It describes how the managed objects can be defined in the MIB, data types and values MOs can have, and how MOs are named", a: "SMI" },
  { q: "A protocol situated and connects Internet Web Browser and web server", a: "HTTP" },
  { q: "It's indicator is when the infrastructure is almost or absolutely not working where all users and applications on the network are affected", a: "Network Failure" },
  { q: "An enhanced version of SGMP and an interim solution", a: "SNMP" },
  { q: "It is issued by an SNMP manager on behalf of the NS to retrieve information from an agent", a: "GetRequest PDU" },
  { q: "An SNMP Security concepts where agent wish to give different access privileges to different managers", a: "Access Policy" },
  { q: "Defines format of messages exchanged by management systems and agents", a: "SNMP Protocol" },
  { q: "A map of the hierarchical order of managed objects and how they are accessed", a: "MIB" },
  { q: "A property of the network growth and service integration on the on-demand consideration", a: "Modularity" },
  { q: "A standardization process that refers to a document that has retired", a: "Historic" },
  { q: "It provides the first line of security protection in SNMP", a: "Authentication" },
  { q: "An SNMP Operation that sends unsolicited scalar objects values to notify problems", a: "Trap Operation" },
  { q: "A first time network technician is currently troubleshooting a network and suspected the DNS server the culprit of the problem. What type of troubleshooting method is this?", a: "Top-down" },
  { q: "A standardization process refers to a document that is replaced by an updated version", a: "Obsolete" },
  { q: "An SNMP Security concepts where agent may wish to limit access to the MIB to authorized managers", a: "Authentication Service" },
  { q: "The (blank) is a significant part of network design for avoiding disturbance of network services by reducing the likelihood of single point of failure", a: "Redundancy" },
  { q: "An organization responsible for SNMP standardization", a: "Internet Engineering Task Force (IETF)" },
  { q: "The network administrator is currently doing troubleshooting on the router which is several hops away from the DNS server, issuing a command to test the hop connectivity", a: "traceroute" },
  { q: "Rules specifying the format used to define objects managed on the network that the SNMP protocol accesses", a: "SMI" },
  { q: "An SNMP operation that sends unsolicited scalar values to notify problems", a: "trap" },
  { q: "This command is similar to the unsolicited messages initiated by the agent, additionally includes confirmation from the SNMP manager on receiving the message", a: "Inform" },
  { q: "It allows NMS to discover the structure of the MIB view dynamically", a: "GetNextRequest PDU" },
  { q: "It allows you to see MIB using the graphical user interface (GUI)", a: "MIB Browser" },
  { q: "A protocol that provides only primitive and limited security capability via the concept of community", a: "SNMPv1" },
  { q: "The systems administrator wants to determine segment connectivity of one the end-users Windows workstation to the server. What command should be used?", a: "tracert" },
  { q: "It is issued by the SNMP manager on behalf of the NS to modify information in an agent", a: "SetRequest PDU" }
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const App = () => {
  const [currentStep, setCurrentStep] = useState('selection'); // selection | quiz | result
  const [activeSet, setActiveSet] = useState([]);
  const [quizName, setQuizName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Memoized options for the current question
  const currentOptions = useMemo(() => {
    if (shuffledQuestions.length === 0) return [];
    const correct = shuffledQuestions[currentIndex].a;
    
    // Get unique answers from the active set for distractors
    const allUniqueAnswers = [...new Set(activeSet.map(item => item.a))];
    const otherAnswers = allUniqueAnswers.filter(a => a.toLowerCase() !== correct.toLowerCase());
    
    const distractors = shuffleArray(otherAnswers).slice(0, 3);
    return shuffleArray([correct, ...distractors]);
  }, [currentIndex, shuffledQuestions, activeSet]);

  const selectQuiz = (set, name) => {
    setActiveSet(set);
    setQuizName(name);
    setShuffledQuestions(shuffleArray(set));
    setCurrentIndex(0);
    setScore(0);
    setCurrentStep('quiz');
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option.toLowerCase() === shuffledQuestions[currentIndex].a.toLowerCase()) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      setCurrentStep('result');
    }
  };

  const resetToMenu = () => {
    setCurrentStep('selection');
    setActiveSet([]);
    setQuizName("");
  };

  // ---------------- UI COMPONENTS ----------------

  if (currentStep === 'selection') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-4xl w-full">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Netman & Security Portal</h1>
            <p className="text-slate-500 font-medium italic">Select a quiz to begin your revision</p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Final Exam OT Card */}
            <button 
              onClick={() => selectQuiz(finalExamData, "Final Exam OT")}
              className="group bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-blue-500 transition-all text-left flex flex-col items-start"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="text-blue-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Final Exam OT</h2>
              <p className="text-slate-500 text-sm mb-6 flex-1">Comprehensive cybersecurity management architecture, NM software systems, and data description languages.</p>
              <div className="w-full flex justify-between items-center text-xs font-black uppercase tracking-widest text-blue-600">
                <span>{finalExamData.length} Questions</span>
                <span className="bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">Start &rarr;</span>
              </div>
            </button>

            {/* Quiz 2 Card */}
            <button 
              onClick={() => selectQuiz(quiz2Data, "Quiz 2")}
              className="group bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-indigo-500 transition-all text-left flex flex-col items-start"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="text-indigo-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz 2</h2>
              <p className="text-slate-500 text-sm mb-6 flex-1">SNMP operations, PDUs, Network design principles (resiliency, modularity), and troubleshooting tools (traceroute).</p>
              <div className="w-full flex justify-between items-center text-xs font-black uppercase tracking-widest text-indigo-600">
                <span>{quiz2Data.length} Questions</span>
                <span className="bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">Start &rarr;</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'result') {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">{quizName}</h2>
          <div className="text-6xl font-black text-blue-600 mb-4">{percentage}%</div>
          <p className="text-slate-500 mb-10 font-medium uppercase tracking-widest text-xs">
            Score: {score} / {shuffledQuestions.length} Correct
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => selectQuiz(activeSet, quizName)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <RotateCcw className="w-5 h-5" /> Retake This Quiz
            </button>
            <button 
              onClick={resetToMenu}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-5 h-5" /> Back to Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Quiz Header */}
        <div className="mb-10 flex items-center gap-4">
          <button 
            onClick={resetToMenu}
            className="p-3 bg-white hover:bg-slate-100 rounded-2xl shadow-sm border border-slate-200 transition-all text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {quizName} • Question {currentIndex + 1}
              </span>
              <span className="text-xs font-black text-blue-600 uppercase">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-blue-600 h-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 mb-8 border border-white">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Knowledge Check</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-12">
            {currentQ.q}?
          </h3>

          <div className="grid gap-4">
            {currentOptions.map((option, idx) => {
              const isCorrect = option.toLowerCase() === currentQ.a.toLowerCase();
              const isSelected = selectedAnswer === option;
              
              let style = "border-2 border-slate-50 bg-slate-50 hover:border-blue-100 hover:bg-blue-50/30 text-slate-700";
              if (isAnswered) {
                if (isCorrect) {
                  style = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-4 ring-emerald-100 shadow-md scale-[1.02]";
                } else if (isSelected && !isCorrect) {
                  style = "border-rose-500 bg-rose-50 text-rose-800 ring-4 ring-rose-100 shadow-md scale-[0.98]";
                } else {
                  style = "border-transparent bg-slate-50 text-slate-400 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(option)}
                  className={`group relative w-full p-6 rounded-3xl text-left font-bold transition-all flex items-center justify-between text-base ${style}`}
                >
                  <span className="flex-1 pr-6">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-7 h-7 text-emerald-500 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-7 h-7 text-rose-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center">
          {isAnswered && (
            <button
              onClick={nextQuestion}
              className="bg-slate-900 hover:bg-black text-white font-black py-4 px-12 rounded-[1.5rem] flex items-center gap-4 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
            >
              {currentIndex === shuffledQuestions.length - 1 ? 'See Results' : 'Next Question'}
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;