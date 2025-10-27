"use client"

import { useState } from "react"
import { useRoasts } from "../hooks/use-roasts"

const DEFAULT_ROASTS = [
  "Hey {name}, NASA called — they found your missing brain cell.",
  "{name}, you bring everyone so much joy... when you leave the room.",
  "I would roast {name}, but I don't want to get ashes all over my keyboard.",
  "{name}, you're the reason they put instructions on shampoo bottles.",
  "If {name} was a vegetable, they'd be a turnip... because nobody wants them.",
  "{name}, you're proof that evolution can go in reverse.",
  "I'd tell {name} to go to hell, but they'd probably get lost on the way.",
  "{name}, you're like a human version of a participation trophy.",
  "If {name} was a book, they'd be a coloring book... for toddlers.",
  "{name}, you're the human equivalent of wet socks.",
  "I'd roast {name}, but I don't want to be accused of animal cruelty.",
  "{name}, you're so boring, even your shadow left you.",
  "If {name} was a pizza, they'd be pineapple... nobody asked for it.",
  "{name}, you're the reason they invented the mute button.",
  "I'd say {name} is the life of the party, but nobody invited them.",
  "{name}, you're like a software update — nobody wants you, but here you are.",
  "If {name} was a WiFi signal, you'd be out of range.",
  "{name}, you're the human equivalent of a 'skip ad' button.",
  "I'd roast {name}, but my mom said I shouldn't burn trash.",
  "{name}, you're proof that not all humans are created equal.",
]

export default function RoastGenerator() {
  const [friendName, setFriendName] = useState("")
  const [currentRoast, setCurrentRoast] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { addRoast, getCustomRoasts } = useRoasts()

  const generateRoast = () => {
    if (!friendName.trim()) {
      alert("Enter your friend's name to get roasted!")
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      const allRoasts = [...DEFAULT_ROASTS, ...getCustomRoasts()]
      const randomRoast = allRoasts[Math.floor(Math.random() * allRoasts.length)]
      const personalizedRoast = randomRoast.replace(/{name}/g, friendName)

      setCurrentRoast(personalizedRoast)
      addRoast(friendName)
      setIsGenerating(false)
    }, 300)
  }

  const speakRoast = () => {
    if (!currentRoast) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(currentRoast)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  const copyToClipboard = async () => {
    if (!currentRoast) return

    try {
      await navigator.clipboard.writeText(currentRoast)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareRoast = async () => {
    if (!currentRoast) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Roast Arena",
          text: currentRoast,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>🔥 Generate a Roast</h2>
        <p style={styles.cardSubtitle}>Enter your friend's name and unleash the heat</p>
      </div>
      <div style={styles.cardContent}>
        <div style={styles.inputGroup}>
          <input
            placeholder="Enter friend's name..."
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && generateRoast()}
            style={styles.input}
          />
          <button onClick={generateRoast} style={styles.button} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>

        {currentRoast && (
          <div style={styles.roastContainer}>
            <div style={styles.roastBox}>
              <div style={styles.roastHeader}>
                <span style={styles.roastBadge}>ROAST</span>
              </div>
              <p style={styles.roastText}>"{currentRoast}"</p>
              <div style={styles.roastFooter}>
                <span style={styles.targetName}>→ {friendName}</span>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={speakRoast} style={styles.buttonSecondary} title="Speak the roast">
                {isSpeaking ? "⏹ Stop" : "🔊 Speak"}
              </button>
              <button onClick={copyToClipboard} style={styles.buttonSecondary} title="Copy to clipboard">
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
              <button onClick={shareRoast} style={styles.buttonSecondary} title="Share roast">
                📤 Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    width: "100%",
    border: "1px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "rgba(26, 26, 46, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(255, 23, 68, 0.1)",
  },
  cardHeader: {
    padding: "24px",
    borderBottom: "1px solid rgba(255, 23, 68, 0.2)",
    background: "linear-gradient(135deg, rgba(255, 23, 68, 0.1) 0%, rgba(0, 188, 212, 0.05) 100%)",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    color: "#ff1744",
    letterSpacing: "1px",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#b0b0b0",
    margin: "8px 0 0 0",
  },
  cardContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    gap: "12px",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#ff1744",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 23, 68, 0.3)",
  },
  roastContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  roastBox: {
    padding: "24px",
    backgroundColor: "rgba(255, 23, 68, 0.08)",
    border: "2px solid rgba(255, 23, 68, 0.4)",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
  },
  roastHeader: {
    marginBottom: "12px",
  },
  roastBadge: {
    display: "inline-block",
    padding: "4px 12px",
    backgroundColor: "#ff1744",
    color: "white",
    fontSize: "11px",
    fontWeight: "700",
    borderRadius: "4px",
    letterSpacing: "1px",
  },
  roastText: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.6",
    margin: 0,
    color: "#fff",
  },
  roastFooter: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#00bcd4",
    fontWeight: "600",
  },
  targetName: {
    display: "inline-block",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  buttonSecondary: {
    flex: 1,
    minWidth: "100px",
    padding: "12px 16px",
    backgroundColor: "rgba(0, 188, 212, 0.15)",
    color: "#00bcd4",
    border: "1px solid rgba(0, 188, 212, 0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
}
