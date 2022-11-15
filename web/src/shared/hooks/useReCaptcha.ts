import React, { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export function useReCaptcha() {
	const [catpchaToken, setCatpchaToken] = useState<string | null>(null);
	const captchaRef = React.useRef<ReCAPTCHA>(null);

	const handleRecaptcha = useCallback((value: string | null) => {
		if (value) {
			setCatpchaToken(value);
		}
	}, []);

	return [catpchaToken, captchaRef, handleRecaptcha] as const;
}