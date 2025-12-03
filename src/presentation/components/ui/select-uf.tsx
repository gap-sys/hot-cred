"use client";

import React, { useState, useRef, useEffect } from "react";
import S from "src/presentation/pages/submission/submission.module.scss";

type SelectUFProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
};

const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

export const SelectUF: React.FC<SelectUFProps> = ({ name, value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler, { passive: true });
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (uf: string) => {
    const syntheticEvent = {
      target: { name, value: uf },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
    setOpen(false);
  };

  return (
    <div className={S.customSelect} ref={ref}>
      <div
        className={`${S.customSelectControl} ${error ? S.inputError : ""}`}
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {value || "Selecione"}
        <span className={S.customSelectArrow}>▼</span>
      </div>
      {open && (
        <div className={S.customSelectMenu} role="listbox">
          {UFS.map((uf) => (
            <div
              key={uf}
              className={S.customSelectOption}
              onClick={() => handleSelect(uf)}
              role="option"
              aria-selected={value === uf}
            >
              {uf}
            </div>
          ))}
        </div>
      )}
      {error && <span className={S.inputErrorText}>{error}</span>}
    </div>
  );
};

