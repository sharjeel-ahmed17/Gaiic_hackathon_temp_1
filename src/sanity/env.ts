export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-07'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_Dataset'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skbUlgPJbmSUXmBpfdnWvwbyGfFmhuDidbmNuMh44GmwaPQCdtm9iql3zQCkkkSIuXc0BmLPcLkuFskizT2owqRJDTMLx1UjOY7d225PJl5QUpZ98AKd50dlBFsx05eux7xGFGTnnv0hcB8EzxFOxFZX6P9LqsNj8q2BXCKoCrEVMqBHxgz9",
  'Missing environment variable: SANITY_API_TOKEN'
)
// export const token = assertValue(
//   process.env.SANITY_API_TOKEN,
//   'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
// )

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
