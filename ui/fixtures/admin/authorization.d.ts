// web/ui/e2e/fixtures/authorization.d.ts

interface Auth {
  category: string;
  subcategory: string;
  authority: "WRITE" | "READ";
}

declare const auth: Auth[];
declare const authRead: Auth[];

export { auth, authRead };
