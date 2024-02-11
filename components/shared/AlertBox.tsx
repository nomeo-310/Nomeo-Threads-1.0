import { Check  } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface alertSuccessProps {
  alertTitle: string
  alertDescription: string
}

const AlertSuccess = ({alertTitle, alertDescription}:alertSuccessProps) => {
  return (
    <Alert className="text-green-600 border border-green-600">
      <Check className="w-4 h-4 text-green-600" />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>
        {alertDescription}
      </AlertDescription>
    </Alert>
  )
}

export { AlertSuccess }