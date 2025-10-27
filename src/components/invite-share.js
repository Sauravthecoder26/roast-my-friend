"use client"

import { useState } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function InviteShare() {
  const [inviteLink, setInviteLink] = useState("")
  const [copied, setCopied] = useState(false)
  const { getInviteLink } = useRoasts()

  const handleGenerateInvite = () => {
    const link = getInviteLink()
    if (link) {
      setInviteLink(link)
      setCopied(false)
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareWhatsApp = () => {
    if (!inviteLink) return

    const message = encodeURIComponent(
      `🔥 Join me in Roast Arena! Click this link to add me as a friend and start roasting: ${inviteLink}`,
    )
    const whatsappUrl = `https://wa.me/?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>📱 Invite Friends via WhatsApp</h2>
        <p style={styles.cardSubtitle}>Share your invite link and let friends join automatically</p>
      </div>
      <div style={styles.cardContent}>
        {!inviteLink ? (
          <button onClick={handleGenerateInvite} style={styles.generateButton}>
            Generate Invite Link
          </button>
        ) : (
          <div style={styles.inviteSection}>
            <div style={styles.linkBox}>
              <input type="text" value={inviteLink} readOnly style={styles.linkInput} />
              <button onClick={handleCopyToClipboard} style={styles.copyButton}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={handleShareWhatsApp} style={styles.whatsappButton}>
                📲 Share on WhatsApp
              </button>
              <button onClick={handleGenerateInvite} style={styles.newInviteButton}>
                Generate New Link
              </button>
            </div>

            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                💡 When your friend clicks this link, they'll automatically be added to your friends list!
              </p>
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
    gap: "16px",
  },
  generateButton: {
    padding: "12px 24px",
    backgroundColor: "linear-gradient(135deg, #ff1744 0%, #d32f2f 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  inviteSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  linkBox: {
    display: "flex",
    gap: "12px",
  },
  linkInput: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid rgba(0, 188, 212, 0.3)",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "monospace",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#00bcd4",
    outline: "none",
  },
  copyButton: {
    padding: "12px 24px",
    backgroundColor: "rgba(0, 188, 212, 0.2)",
    color: "#00bcd4",
    border: "1px solid rgba(0, 188, 212, 0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  whatsappButton: {
    flex: 1,
    minWidth: "200px",
    padding: "12px 24px",
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  newInviteButton: {
    flex: 1,
    minWidth: "200px",
    padding: "12px 24px",
    backgroundColor: "rgba(255, 23, 68, 0.2)",
    color: "#ff1744",
    border: "1px solid rgba(255, 23, 68, 0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  infoBox: {
    padding: "16px",
    backgroundColor: "rgba(0, 188, 212, 0.1)",
    border: "1px solid rgba(0, 188, 212, 0.2)",
    borderRadius: "8px",
  },
  infoText: {
    fontSize: "14px",
    color: "#00bcd4",
    margin: 0,
  },
}
