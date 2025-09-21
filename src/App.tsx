import { DirectionProvider, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AdvancedCalendar from "./AdvancedCalendar";
import TimesheetCalendar from "./TimesheetCalendar";
import IranianCalendar from "./IranianCalendar";


function App() {
  return (
    <DirectionProvider >
      <MantineProvider>
          {/* <AdvancedCalendar/> */}
          <TimesheetCalendar/>
          {/* <IranianCalendar/> */}
      </MantineProvider>
    </DirectionProvider>
  );
}

export default App;
