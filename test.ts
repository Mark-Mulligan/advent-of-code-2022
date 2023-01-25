function isValid(s: string): boolean {
  if (s.length % 2 !== 0) return false;
  const openP = ['(', '{', '['];
  const parenPairs: any = { ')': '(', '}': '{', ']': '[' };
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (openP.includes(s[i])) stack.push(s[i]);
    else {
      const targetParen = stack.pop();
      if (targetParen !== parenPairs[s[i]]) return false;
    }
  }

  console.log(stack);

  return s.length === 0;
}

console.log(isValid('()'));

// let stage1 = ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'];
// let stage2 = ['10', '6', '12', '-11', '*', '/', '*', '17', '+', '5', '+'];
// let stage3 = ['10', '6', '-132', '/', '*', '17', '+', '5', '+'];
// let stage4 = ['10', '6', '-132', '/', '*', '17', '+', '5', '+'];
// let stage5 = ['10', '0', '*', '17', '+', '5', '+'];
// let stage6 = ['0', '17', '+', '5', '+'];
// let stage7 = ['17', '5', '+'];
// let stage8 = ['22'];
