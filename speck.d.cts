export interface SpeckParams {
  /** Word size in bits. The full block size is 2 * bits. Defaults to 16. */
  bits?: number
  /** Number of rounds. Defaults to 22. */
  rounds?: number
  /** Right rotation amount used in the round function (alpha). Defaults to 7. */
  rightRotations?: number
  /** Left rotation amount used in the round function (beta). Defaults to 2. */
  leftRotations?: number
}

export interface Speck {
  /**
   * Encrypts a single non-negative integer packing two `bits`-sized words
   * (a value in [0, 2^(2*bits))), returning an integer in the same range.
   */
  encrypt: (input: number, key: number[]) => number
  /** Inverse of `encrypt`. */
  decrypt: (input: number, key: number[]) => number
  /** Low-level: encrypts a [x, y] word pair directly, without packing/unpacking a single integer. */
  encryptRaw: (pt: [number, number], key: number[]) => [number, number]
  /** Low-level: inverse of `encryptRaw`. */
  decryptRaw: (pt: [number, number], key: number[]) => [number, number]
}

declare function createSpeck (params?: SpeckParams): Speck
export = createSpeck
