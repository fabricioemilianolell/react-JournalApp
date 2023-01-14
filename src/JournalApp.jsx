import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/appTheme"


export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}
