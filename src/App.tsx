import { DirectionProvider, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AdvancedRBCCalendar from "./AdvancedRBCCalendar";
import RBCCalendar from "./RBCCalendar";
import IranianCalendar from "./IranianCalendar";
import FullCalendar from "./FullCalendar";
import AdvancedFullCalendar from "./AdvancedFullCalendar";
import AgendaDemo from "./AgendaDemo";


function App() {
  return (
    <DirectionProvider >
      <MantineProvider>
          {/* <AdvancedRBCCalendar/> */}
          {/* <RBCCalendar/> */}
          {/* <IranianCalendar/> */}
          {/* <FullCalendar/> */}
          <AdvancedFullCalendar/>
          {/* <AgendaDemo/> */}
      </MantineProvider>
    </DirectionProvider>
  );
}

export default App;
