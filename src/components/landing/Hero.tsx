"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./hero.css";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("");
  const router = useRouter();

  const handleChipClick = (chip: string) => {
    setActiveChip(chip);
    setQuery(chip + " ");
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/mentors?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/mentors');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="sl-hero">
      <div className="sl-blob sl-b1"></div>
      <div className="sl-blob sl-b2"></div>
      <div className="sl-blob sl-b3"></div>
      <div className="sl-wrap sl-grid">
        <div>
          <span className="sl-tag"><i></i>1:1 and group sessions with real toppers</span>
          <h1>Learn from those who've <em>already<br/>cleared it.</em></h1>
          <p className="sl-sub">Book live sessions with seniors from IITs, NITs, AIIMS and top colleges who cracked the exam you're preparing for.</p>
          <div className="sl-search">
            <span>🔍</span>
            <input 
              id="q" 
              placeholder="What do you want to crack? e.g. JEE Advanced Maths"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="sl-btn sl-p" onClick={handleSearch}>Find a mentor</button>
          </div>
          <div className="sl-chips">
            {["JEE", "NEET", "UPSC", "GATE", "CAT"].map(chip => (
              <button 
                key={chip} 
                className={`sl-chip ${activeChip === chip ? "sl-on" : ""}`}
                onClick={() => handleChipClick(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="sl-trust">
            <span><b>Verified</b> rank holders</span>
            <span><b>Live</b> video sessions</span>
            <span><b>Flexible</b> slots</span>
          </div>
        </div>
        <div className="sl-visual">
          <div className="sl-call">
            <div className="sl-screen">
              <div className="sl-live"><i></i>Live · JEE Maths · 1:1</div>
              <div className="sl-av sl-m">R</div>
              <div className="sl-av sl-s">You</div>
            </div>
          </div>
          <div className="sl-fc sl-f1">
            <div className="sl-ic">🏆</div>
            <div><b>AIR 214 · JEE Adv.</b><small>IIT Bombay, CSE</small></div>
          </div>
          <div className="sl-fc sl-f2">
            <div className="sl-ic">⭐</div>
            <div><b>4.9 mentor rating</b><small>120+ sessions</small></div>
          </div>
          <div className="sl-fc sl-f3">
            <div className="sl-ic">📅</div>
            <div><b>Next slot: Today 7 PM</b><small>Book in 2 taps</small></div>
          </div>
        </div>
      </div>
    </header>
  );
}
