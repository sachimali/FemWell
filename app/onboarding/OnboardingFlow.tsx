import React, { useState } from "react";
import OnboardingStep1 from "./OnboardingStep1";
import OnboardingStep2 from "./OnboardingStep2";
import OnboardingStep3 from "./OnboardingStep3";
import OnboardingStep4 from "./OnboardingStep4";
import OnboardingStep5 from "./OnboardingStep5";
import OnboardingStep6 from "./OnboardingStep6";
import OnboardingStep7 from "./OnboardingStep7";
import OnboardingStep8 from "./OnboardingStep8";

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, 8));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // Fake navigation object so each screen works as-is
  const nav = {
    navigate: next,
    goBack: back,
  };

  switch (step) {
    case 1: return <OnboardingStep1 navigation={nav} />;
    case 2: return <OnboardingStep2 navigation={nav} />;
    case 3: return <OnboardingStep3 navigation={nav} />;
    case 4: return <OnboardingStep4 navigation={nav} />;
    case 5: return <OnboardingStep5 navigation={nav} />;
    case 6: return <OnboardingStep6 navigation={nav} />;
    case 7: return <OnboardingStep7 navigation={nav} />;
    case 8: return <OnboardingStep8 navigation={nav} />;
    default: return <OnboardingStep1 navigation={nav} />;
  }
}