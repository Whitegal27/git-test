import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = (action) => {
    if (action === "login") {
      navigate("/login");
    } else if (action === "register") {
      navigate("/register");
    }
  };

  const handleLogoClick = () => {
    navigate("/dashboard"); // redirect to dashboard (or "/" if you prefer home)
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Convenant
          </button>
        </div>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <AuthenticatedNav user={user} onLogout={logout} />
          ) : (
            <UnauthenticatedNav onAuthAction={handleAuthAction} />
          )}
        </nav>
      </div>
    </header>
  );
}

function AuthenticatedNav({ user, onLogout }) {
  const displayName = user?.name || user?.email?.split("@")[0] || "User";

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-muted-foreground hidden sm:inline">
        Welcome, {displayName}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onLogout}
        className="text-sm"
      >
        Logout
      </Button>
    </div>
  );
}

function UnauthenticatedNav({ onAuthAction }) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAuthAction("login")}
        className="text-sm"
      >
        Login
      </Button>
      <Button
        size="sm"
        onClick={() => onAuthAction("register")}
        className="text-sm"
      >
        Get Started
      </Button>
    </div>
  );
}
