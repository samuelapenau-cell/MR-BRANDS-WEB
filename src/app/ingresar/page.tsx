"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroSlideshow } from "@/components/HeroSlideshow";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase());

type PageMode = "login" | "register";

export default function IngresarPage() {
  const { user, loading, signInWithGoogle, signInWithEmail, signUp } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<PageMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const userEmail = user.email?.toLowerCase() || "";
      router.push(ADMIN_EMAILS.includes(userEmail) ? "/admin" : "/perfil");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) { setError("Completá todos los campos"); return; }
    setSubmitting(true);
    const err = await signInWithEmail(email.trim(), password);
    setSubmitting(false);
    if (err) setError("Credenciales incorrectas");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) { setError("Completá todos los campos"); return; }
    if (password.length < 6) { setError("Minimo 6 caracteres"); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden"); return; }
    setSubmitting(true);
    const err = await signUp(email.trim(), password);
    setSubmitting(false);
    if (err) {
      if (err.message.toLowerCase().includes("already")) {
        setError("Este correo ya está registrado. Iniciá sesión.");
      } else {
        setError("Error al crear la cuenta");
      }
    } else {
      setRegistered(true);
    }
  };

  if (registered) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 relative overflow-hidden">
        <HeroSlideshow />
        <div className="relative z-10 w-full max-w-sm text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-3xl text-offwhite tracking-[2px] mb-2">Cuenta creada</h1>
          <p className="text-sm text-offwhite/40 font-body mb-6">Revisá tu correo para confirmar la cuenta.</p>
          <button onClick={() => { setMode("login"); setRegistered(false); }} className="text-xs font-mono uppercase tracking-[2px] text-gold hover:text-gold/70 transition-colors">
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 relative overflow-hidden">
      <HeroSlideshow />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-[1px] bg-gold/40" />
            <span className="text-[10px] font-mono uppercase tracking-[3px] text-gold/50">MR.BRANDS</span>
            <span className="w-6 h-[1px] bg-gold/40" />
          </div>
          <h1 className="font-display text-5xl text-offwhite tracking-[2px] mb-2">
            {mode === "login" ? "Ingresar" : "Registrarse"}
          </h1>
          <p className="text-sm text-offwhite/30 font-body">
            {mode === "login" ? "Ingresá con tu correo y contraseña" : "Creá tu cuenta para comprar"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 border-b border-border/10">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 pb-3 text-[11px] font-mono uppercase tracking-[2px] transition-colors relative ${mode === "login" ? "text-gold" : "text-offwhite/25 hover:text-offwhite/50"}`}
          >
            Iniciar Sesión
            {mode === "login" && <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold/60" />}
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 pb-3 text-[11px] font-mono uppercase tracking-[2px] transition-colors relative ${mode === "register" ? "text-gold" : "text-offwhite/25 hover:text-offwhite/50"}`}
          >
            Crear Cuenta
            {mode === "register" && <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold/60" />}
          </button>
        </div>

        <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-5">
          <div>
            <label className="text-[9px] font-mono uppercase tracking-[2px] text-offwhite/30 block mb-2">Correo electrónico</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 bg-surface-light border border-border/50 rounded-sm text-sm text-offwhite/80 placeholder-offwhite/15 font-body outline-none focus:border-gold/40 transition-all duration-200"
            />
          </div>

          <div>
            <label className="text-[9px] font-mono uppercase tracking-[2px] text-offwhite/30 block mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-surface-light border border-border/50 rounded-sm text-sm text-offwhite/80 placeholder-offwhite/15 font-body outline-none focus:border-gold/40 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-offwhite/30 hover:text-offwhite/60 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="text-[9px] font-mono uppercase tracking-[2px] text-offwhite/30 block mb-2">Confirmar contraseña</label>
              <input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repetí la contraseña"
                className="w-full px-4 py-3 bg-surface-light border border-border/50 rounded-sm text-sm text-offwhite/80 placeholder-offwhite/15 font-body outline-none focus:border-gold/40 transition-all duration-200"
              />
            </div>
          )}

          {error && (
            <div className="px-4 py-3 bg-red-500/5 border border-red-500/20 rounded-sm">
              <p className="text-[10px] font-mono text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full py-3 bg-gold/10 border border-gold/20 rounded-sm text-sm font-mono uppercase tracking-[2px] text-gold hover:bg-gold/20 disabled:opacity-30 transition-all duration-200"
          >
            {submitting ? "..." : mode === "login" ? "Ingresar" : "Crear Cuenta"}
          </button>

          {mode === "login" && (
            <div className="text-center -mt-2">
              <Link href="/recuperar" className="text-[10px] font-mono uppercase tracking-[1.5px] text-offwhite/30 hover:text-gold transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center gap-4">
          <span className="flex-1 h-[1px] bg-border/30" />
          <span className="text-[10px] font-mono uppercase tracking-[2px] text-offwhite/20">O</span>
          <span className="flex-1 h-[1px] bg-border/30" />
        </div>

        {/* Google */}
        <button
          onClick={signInWithGoogle}
          disabled={submitting || loading}
          className="mt-8 w-full group relative flex items-center justify-center gap-3 px-6 py-3.5 bg-surface-light border border-border/50 rounded-sm hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-body text-offwhite/70 group-hover:text-offwhite transition-colors">
            Continuar con Google
          </span>
        </button>

        <div className="mt-8 text-center">
          <Link href="/tienda" className="text-[10px] font-mono uppercase tracking-[2px] text-offwhite/30 hover:text-gold transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
