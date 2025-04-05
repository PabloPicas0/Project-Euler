export function isPrime(num: number) {
    if (num <= 1) return false; // negatives
    if (num % 2 == 0 && num > 2) return false; // even numbers
  
    for (let i = 3, s = Math.sqrt(num); i <= s; i += 2) {
      if (num % i === 0) return false;
    }
    
    return true;
  }