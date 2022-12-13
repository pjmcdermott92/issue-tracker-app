const useValidatePassword = (password: string | null) => {
    const isLength = password!.length >= 8 && password!.length <= 20;
    const hasUpperCaseChar = /([A-Z])/g.test(password!);
    const hasLowerCaseChar = /([a-z])/g.test(password!);
    const hasSpecialChar = /([@#$!%*?&])/g.test(password!);
    const isValid =
        isLength &&
        hasLowerCaseChar &&
        hasUpperCaseChar &&
        hasSpecialChar;

    return { isLength, hasUpperCaseChar, hasLowerCaseChar, hasSpecialChar, isValid };
}

export default useValidatePassword;
