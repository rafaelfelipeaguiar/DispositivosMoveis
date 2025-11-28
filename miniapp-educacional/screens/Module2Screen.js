import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { modules, codeExamples } from "../data/modules";
import CodeBlock from "../components/CodeBlock";
import ChallengeBox from "../components/ChallengeBox";

export default function Module2Screen({ route }) {
  const module = modules[1];
  const scrollViewRef = React.useRef(null);
  const solutionsRef = React.useRef(null);

  const [count, setCount] = useState(0);

  const [autoCount, setAutoCount] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Aprender useState", done: true },
    { id: 2, text: "Dominar useEffect", done: false },
  ]);

  useEffect(() => {
    console.log("Contador automático:", autoCount);
  }, [autoCount]);

  useEffect(() => {
    let interval;

    if (isAutoRunning) {
      interval = setInterval(() => {
        setAutoCount((prev) => prev + 1);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoRunning]);

  const resetCounters = () => {
    setCount(0);
    setAutoCount(0);
    setIsAutoRunning(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text: `Nova tarefa ${tasks.length + 1}`,
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  React.useEffect(() => {
    if (route.params?.mode === "solutions" && solutionsRef.current) {
      setTimeout(() => {
        solutionsRef.current.measureLayout(scrollViewRef.current, (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
        });
      }, 300);
    }
  }, [route.params?.mode]);

  const showLearning = route.params?.mode !== "solutions";
  const showSolutions = route.params?.mode === "solutions";

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{module.icon}</Text>
        <Text style={styles.title}>{module.title}</Text>
      </View>

      {showLearning && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📖 O que você vai aprender</Text>
            <Text style={styles.description}>{module.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💻 Código</Text>
            <CodeBlock code={codeExamples[2]} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Exemplo Interativo</Text>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>🎓 O que são Hooks?</Text>
              <Text style={styles.explanationText}>
                Hooks são{" "}
                <Text style={styles.highlight}>funções especiais</Text> que
                permitem usar recursos do React em componentes funcionais. O{" "}
                <Text style={styles.highlight}>useState</Text> gerencia dados
                que mudam, e o <Text style={styles.highlight}>useEffect</Text>{" "}
                executa ações quando algo acontece (efeitos colaterais).
              </Text>
            </View>

            <View style={styles.counterBox}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 useState - Gerenciar Estado
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>useState(0)</Text> - cria
                  variável "count" iniciando em 0
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>setCount()</Text> - função
                  para atualizar o valor
                </Text>
                <Text style={styles.conceptItem}>
                  • Quando o estado muda, o componente{" "}
                  <Text style={styles.highlight}>re-renderiza</Text>
                </Text>
              </View>

              <Text style={styles.counterLabel}>
                Contador Manual (useState)
              </Text>
              <View style={styles.counterDisplay}>
                <Text style={styles.counterValue}>{count}</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={() => setCount(count - 1)}
                >
                  <Text style={styles.buttonText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => setCount(count + 1)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Elementos utilizados:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>useState(valorInicial)</Text>
                  <Text style={styles.elementDesc}>
                    Retorna [valor, setValor] - valor atual e função para
                    atualizar
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>onPress</Text>
                  <Text style={styles.elementDesc}>
                    Evento disparado quando o usuário toca no botão
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const [count, setCount] = useState(0);

// Incrementar
<TouchableOpacity onPress={() => setCount(count + 1)}>
  <Text>+</Text>
</TouchableOpacity>

// Decrementar  
<TouchableOpacity onPress={() => setCount(count - 1)}>
  <Text>−</Text>
</TouchableOpacity>

// Valor atual: ${count}`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.counterBox, { marginTop: 16 }]}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 useEffect - Efeitos Colaterais
                </Text>
                <Text style={styles.conceptItem}>
                  •{" "}
                  <Text style={styles.highlight}>
                    useEffect(() =&gt; {"{...}"}, [deps])
                  </Text>{" "}
                  - executa quando deps mudam
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>setInterval</Text> - executa
                  código repetidamente
                </Text>
                <Text style={styles.conceptItem}>
                  •{" "}
                  <Text style={styles.highlight}>return () =&gt; cleanup</Text>{" "}
                  - limpa recursos ao desmontar
                </Text>
              </View>

              <Text style={styles.counterLabel}>
                Contador Automático (useEffect)
              </Text>
              <View style={styles.counterDisplay}>
                <Text style={styles.counterValue}>{autoCount}</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    isAutoRunning ? styles.buttonDanger : styles.buttonSuccess,
                  ]}
                  onPress={() => setIsAutoRunning(!isAutoRunning)}
                >
                  <Text style={styles.buttonText}>
                    {isAutoRunning ? "⏸ Pausar" : "▶ Iniciar"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.hint}>
                {isAutoRunning ? "⚡ Incrementando a cada 2s..." : "💤 Pausado"}
              </Text>

              <View style={styles.elementsBox}>
                <Text style={styles.elementsTitle}>
                  📚 Elementos utilizados:
                </Text>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    useEffect(callback, [deps])
                  </Text>
                  <Text style={styles.elementDesc}>
                    Executa callback quando dependências mudam
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>
                    setInterval / clearInterval
                  </Text>
                  <Text style={styles.elementDesc}>
                    Timer que executa repetidamente / para o timer
                  </Text>
                </View>
                <View style={styles.elementItem}>
                  <Text style={styles.elementName}>prev =&gt; prev + 1</Text>
                  <Text style={styles.elementDesc}>
                    Função que recebe valor anterior (evita bugs de estado)
                  </Text>
                </View>
              </View>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const [autoCount, setAutoCount] = useState(0);
const [isRunning, setIsRunning] = useState(${isAutoRunning});

useEffect(() => {
  let interval;
  if (isRunning) {
    interval = setInterval(() => {
      setAutoCount(prev => prev + 1);
    }, 2000);
  }
  // Cleanup - evita memory leak!
  return () => clearInterval(interval);
}, [isRunning]);`}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.buttonReset]}
              onPress={resetCounters}
            >
              <Text style={styles.buttonText}>🔄 Resetar Tudo</Text>
            </TouchableOpacity>

            <View style={[styles.counterBox, { marginTop: 16 }]}>
              <View style={styles.conceptBox}>
                <Text style={styles.conceptTitle}>
                  💡 Estado com Arrays/Objetos
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>[...array, novo]</Text> -
                  spread para adicionar item
                </Text>
                <Text style={styles.conceptItem}>
                  • <Text style={styles.highlight}>array.map()</Text> -
                  transforma cada item do array
                </Text>
                <Text style={styles.conceptItem}>
                  •{" "}
                  <Text style={styles.highlight}>{"{...obj, prop: novo}"}</Text>{" "}
                  - atualiza propriedade do objeto
                </Text>
              </View>

              <Text style={styles.counterLabel}>
                Lista de Tarefas (useState)
              </Text>

              {tasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskItem}
                  onPress={() => toggleTask(task.id)}
                >
                  <Text style={styles.taskCheckbox}>
                    {task.done ? "✅" : "⬜"}
                  </Text>
                  <Text
                    style={[styles.taskText, task.done && styles.taskTextDone]}
                  >
                    {task.text}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.button, styles.buttonSuccess, { marginTop: 12 }]}
                onPress={addTask}
              >
                <Text style={styles.buttonText}>➕ Adicionar Tarefa</Text>
              </TouchableOpacity>

              <Text style={styles.hint}>
                📊 Total: {tasks.length} | Concluídas:{" "}
                {tasks.filter((t) => t.done).length}
              </Text>

              <View style={styles.exampleCode}>
                <Text style={styles.exampleCodeTitle}>
                  📝 Código deste exemplo:
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`const [tasks, setTasks] = useState([
  { id: 1, text: "Tarefa 1", done: false }
]);

// Toggle tarefa
const toggleTask = (id) => {
  setTasks(tasks.map(task =>
    task.id === id 
      ? { ...task, done: !task.done } 
      : task
  ));
};

// Adicionar tarefa
const addTask = () => {
  setTasks([...tasks, {
    id: Date.now(),
    text: "Nova tarefa",
    done: false
  }]);
};`}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <ChallengeBox challenge={module.challenge} />
        </>
      )}

      {showSolutions && (
        <>
          <View ref={solutionsRef} style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Soluções do Desafio</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.solutionsScroll}
            >
              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>
                  Solução: Contador Automático
                </Text>
                <Text style={styles.solutionText}>
                  Use setInterval dentro do useEffect para incrementar o
                  contador a cada 2 segundos. Não esqueça do cleanup!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`useEffect(() => {\n  const interval = setInterval(() => {\n    setCount(prev => prev + 1);\n  }, 2000);\n  \n  return () => clearInterval(interval);\n}, []);`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Por que usar prev?</Text>
                <Text style={styles.solutionText}>
                  Usar prev garante que você sempre tem o valor mais atualizado,
                  evitando bugs com estados antigos!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`// ✅ Correto\nsetCount(prev => prev + 1);\n\n// ❌ Pode ter problemas\nsetCount(count + 1);`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Cleanup é Essencial!</Text>
                <Text style={styles.solutionText}>
                  O cleanup (return no useEffect) limpa intervalos e previne
                  memory leaks quando o componente desmonta.
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`useEffect(() => {\n  // Setup\n  const id = setInterval(...);\n  \n  // Cleanup\n  return () => {\n    clearInterval(id);\n  };\n}, []);`}
                  </Text>
                </View>
              </View>

              <View style={styles.solutionCard}>
                <Text style={styles.solutionTitle}>Array de Dependências</Text>
                <Text style={styles.solutionText}>
                  [] vazio = executa uma vez. [count] = executa quando count
                  muda. Sem array = executa sempre!
                </Text>
                <View style={styles.codeSnippet}>
                  <Text style={styles.codeSnippetText}>
                    {`// Uma vez\nuseEffect(() => {...}, []);\n\n// Quando count muda\nuseEffect(() => {...}, [count]);\n\n// Sempre\nuseEffect(() => {...});`}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>💡 Dicas</Text>
            <Text style={styles.tipText}>
              • useState retorna [valor, função]
            </Text>
            <Text style={styles.tipText}>
              • useEffect executa efeitos colaterais
            </Text>
            <Text style={styles.tipText}>
              • Array de dependências controla re-execução
            </Text>
            <Text style={styles.tipText}>• Cleanup evita memory leaks</Text>
          </View>

          <View style={styles.spacing} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F23",
  },
  header: {
    backgroundColor: "#EC4899",
    padding: 28,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#EC4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    letterSpacing: -0.5,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 16,
    color: "#94A3B8",
    lineHeight: 26,
  },
  explanationBox: {
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.25)",
  },
  explanationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#F472B6",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: "#FBCFE8",
    lineHeight: 24,
  },
  highlight: {
    color: "#EC4899",
    fontWeight: "700",
  },
  conceptBox: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  conceptTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#34D399",
    marginBottom: 10,
  },
  conceptItem: {
    fontSize: 14,
    color: "#A7F3D0",
    lineHeight: 22,
    marginVertical: 3,
  },
  elementsBox: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.25)",
  },
  elementsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FBBF24",
    marginBottom: 12,
  },
  elementItem: {
    marginVertical: 6,
  },
  elementName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FDE68A",
    fontFamily: "monospace",
  },
  elementDesc: {
    fontSize: 13,
    color: "#FCD34D",
    marginTop: 2,
  },
  counterBox: {
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 16,
    color: "#94A3B8",
    lineHeight: 26,
  },
  counterBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F472B6",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  counterDisplay: {
    backgroundColor: "rgba(236, 72, 153, 0.15)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.3)",
  },
  counterValue: {
    fontSize: 64,
    fontWeight: "800",
    color: "#F8FAFC",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 18,
    borderRadius: 14,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: "#EC4899",
  },
  buttonSecondary: {
    backgroundColor: "#64748B",
  },
  buttonSuccess: {
    backgroundColor: "#10B981",
  },
  buttonDanger: {
    backgroundColor: "#EF4444",
  },
  buttonReset: {
    backgroundColor: "#8B5CF6",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  hint: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    color: "#94A3B8",
    fontStyle: "italic",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    borderRadius: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  taskCheckbox: {
    fontSize: 24,
    marginRight: 14,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#F8FAFC",
    fontWeight: "500",
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#64748B",
  },
  exampleCode: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  exampleCodeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F472B6",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  solutionsScroll: {
    marginTop: 16,
  },
  solutionCard: {
    width: 320,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 24,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.2)",
    borderLeftWidth: 4,
    borderLeftColor: "#EC4899",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  solutionText: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 24,
    marginBottom: 16,
  },
  codeSnippet: {
    backgroundColor: "#0D1117",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  codeSnippetText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#F472B6",
    lineHeight: 20,
  },
  tips: {
    margin: 24,
    marginTop: 0,
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F472B6",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: "#FBCFE8",
    lineHeight: 24,
    marginVertical: 4,
  },
  spacing: {
    height: 24,
  },
});
