import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster"
      toastOptions={{
        classNames: {
          toast:
            "bg-card text-card-foreground border-border shadow-border font-sans",
          title: "text-foreground",
          description: "text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
