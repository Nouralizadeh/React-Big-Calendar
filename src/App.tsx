import { DirectionProvider, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AdvancedCalendar from "./AdvancedCalendar";
import TimesheetCalendar from "./TimesheetCalendar";


function App() {
  return (
    <DirectionProvider >
      <MantineProvider>
          {/* <AdvancedCalendar/> */}
          <TimesheetCalendar/>
      </MantineProvider>
    </DirectionProvider>
  );
}

export default App;
