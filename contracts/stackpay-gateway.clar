;; StackPay Gateway Smart Contract
;; Handles secure sBTC payments between users on the Stacks blockchain

;; Import sBTC trait
(use-trait sbtc-trait 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.sbtc-trait.sbtc-trait)

;; Define constants
(define-constant ERR-INVALID-RECIPIENT (err u100))
(define-constant ERR-TRANSFER-FAILED (err u101))

;; Define data maps
(define-map transactions 
    { tx-id: (buff 32) }
    {
        sender: principal,
        recipient: principal,
        amount: uint,
        timestamp: uint,
        memo: (optional (string-utf8 256))
    }
)

;; Public function to process payments
(define-public (process-payment
    (recipient principal)
    (amount uint)
    (memo (optional (string-utf8 256)))
    (sbtc-contract <sbtc-trait>))
    (let
        (
            (sender tx-sender)
            (tx-id (unwrap-panic (get-txid)))
        )
        (asserts! (is-some (contract-of recipient)) ERR-INVALID-RECIPIENT)
        
        ;; Attempt sBTC transfer
        (try! (contract-call? sbtc-contract transfer amount recipient none))
        
        ;; Record transaction details
        (map-set transactions 
            { tx-id: tx-id }
            {
                sender: sender,
                recipient: recipient,
                amount: amount,
                timestamp: block-height,
                memo: memo
            }
        )
        
        (ok tx-id)
    )
)

;; Read-only function to get transaction details
(define-read-only (get-transaction (tx-id (buff 32)))
    (map-get? transactions { tx-id: tx-id })
)
