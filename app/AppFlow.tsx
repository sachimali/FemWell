import React, { useState } from "react";
import OnboardingStep1 from "./onboarding/OnboardingStep1";
import OnboardingStep2 from "./onboarding/OnboardingStep2";
import OnboardingStep3 from "./onboarding/OnboardingStep3";
import OnboardingStep4 from "./onboarding/OnboardingStep4";
import OnboardingStep5 from "./onboarding/OnboardingStep5";
import OnboardingStep6 from "./onboarding/OnboardingStep6";
import OnboardingStep7 from "./onboarding/OnboardingStep7";
import OnboardingStep8 from "./onboarding/OnboardingStep8";
import MainApp from "./screens/MainApp";

export default function AppFlow() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const next = () => {
    if (step === 8) { setDone(true); return; }
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const nav = { navigate: next, goBack: back };

  if (done) return <MainApp />;

  switch (step) {
    case 1:  return <OnboardingStep1 navigation={nav} />;
    case 2:  return <OnboardingStep2 navigation={nav} />;
    case 3:  return <OnboardingStep3 navigation={nav} />;
    case 4:  return <OnboardingStep4 navigation={nav} />;
    case 5:  return <OnboardingStep5 navigation={nav} />;
    case 6:  return <OnboardingStep6 navigation={nav} />;
    case 7:  return <OnboardingStep7 navigation={nav} />;
    case 8:  return <OnboardingStep8 navigation={nav} />;
    default: return <OnboardingStep1 navigation={nav} />;
  }
}