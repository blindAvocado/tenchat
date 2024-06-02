import { ref } from "vue";

export const useOTP = (codeLength: number) => {
  type IDigit = null | number;

  type Handler = {
    Backspace: (event: Event, index: number) => void;
    ArrowRight: (event: KeyboardEvent, index: number) => void;
    ArrowLeft: (event: KeyboardEvent, index: number) => void;
  }

  type InputEvents = 'Backspace' | 'ArrowRight' | 'ArrowLeft';

  const code = ref<IDigit[]>(Array(codeLength).fill(null));

  const codeContainer = ref();

  const lastEvent = ref();

  const handleFocusChange = () => {
    let activeFocusEl = codeContainer?.value?.children[0] as HTMLInputElement;
    const focusNext = () => {
      if (activeFocusEl.nextElementSibling) {
        activeFocusEl = activeFocusEl.nextElementSibling as HTMLInputElement;
        activeFocusEl.focus();
      }
    };

    const focusOnIndex = (index: number) => {
      activeFocusEl = codeContainer.value.children[index];
      activeFocusEl.focus();
    };

    const focusPrev = () => {
      if (activeFocusEl.previousElementSibling) {
        activeFocusEl =
          activeFocusEl.previousElementSibling as HTMLInputElement;
        activeFocusEl.focus();
      }
    };

    return {
      focusNext,
      focusPrev,
      focusOnIndex,
    };
  };

  const { focusNext, focusPrev, focusOnIndex } = handleFocusChange();

  const handleBackspace = (event: Event, index: number) => {
    event.preventDefault();

    if (code.value[index] === null) {
      focusPrev();
      return;
    }

    code.value[index] = null;
    event.stopImmediatePropagation();
  };

  const handleInput = (event: InputEvent, index: number) => {
    event.stopImmediatePropagation();
    event.preventDefault();

    if (event.inputType === "deleteContentBackward") {
      code.value[index] = null;
      return false;
    }

    lastEvent.value = event;
    const inputValue = event.data;

    if (!!inputValue && checkPasteValidity(inputValue)) {
      code.value = inputValue.split("").map((strDigit) => +strDigit);
      return false;
    }

    if (
      !!inputValue &&
      new RegExp("^[0-9]$").test(inputValue) &&
      index < codeLength
    ) {
      if (
        code.value[index] === null ||
        (!code.value[index] && !Number.isInteger(code.value[index]))
      ) {
        code.value[index] = Number(inputValue);
        focusNext();
        return false;
      }

      if (index + 1 < codeLength) {
        focusNext();
        code.value[index + 1] = Number(inputValue);
        return false;
      }
    }

    return false;
  };

  const transformStringToCode = (str: string) => {
    return str.split("").map((strDigit) => +strDigit);
  };

  const detectAutofill = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    setTimeout(() => {
      if (target.value && checkPasteValidity(target.value)) {
        code.value = transformStringToCode(target.value);
      }
    }, 0);
  };

  const handleArrows = (direction: "right" | "left") => {
    return function (_event: KeyboardEvent, _index: number) {
      if (direction === "left") {
        focusPrev();
      } else {
        focusNext();
      }
    };
  };

  const keyDownHandler = (): Handler => {
    return {
      Backspace: handleBackspace,
      ArrowRight: handleArrows("right"),
      ArrowLeft: handleArrows("left"),
    };
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    detectAutofill(event);
    const handler = keyDownHandler();
    lastEvent.value = event;
    if (handler.hasOwnProperty(event.key)) {
      return handler[event.key as InputEvents](event, index);
    }
  };

  const handleInputClick = (index: number) => {
    focusOnIndex(index);
  };

  const handleInputFocus = (event: FocusEvent, index: number) => {
    const target = event.target as HTMLInputElement;
    setTimeout(() => {
      target.selectionStart = target.selectionEnd = target.value.length;
      focusOnIndex(index);
    }, 0);
  };

  const checkPasteValidity = (value: string) => {
    const trimmedValue = value.trim();
    return new RegExp(`^[0-9]\{${codeLength}}$`).test(trimmedValue);
  };

  const handleInputPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    lastEvent.value = event;
    const pastedText = event.clipboardData?.getData("text");
    if (pastedText && checkPasteValidity(pastedText)) {
      for (let i = 0; i < pastedText.length; i++) {
        code.value[i] = parseInt(pastedText[i]);
      }
    }
  };

  return {
    handleKeyDown,
    handleInput,
    handleInputClick,
    handleInputPaste,
    handleInputFocus,
    code,
    codeContainer,
    lastEvent,
  };
};
