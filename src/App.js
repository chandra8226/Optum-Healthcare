import './App.css';
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";

function App() {
  const [meds, setMeds] = useState([
    {
      med: 'Hydrocodone',
      time: '8:10 AM',
      taken: 1,
    },
    {
      med: 'Generic Zocor',
      time: '9:10 AM',
      taken: 1,
    },
    {
      med: 'Lisinopril',
      time: '10:10 AM',
      taken: 1,
    },
    {
      med: 'Azithromycin',
      time: '11:10 AM',
      taken: 1,
    },
    {
      med: 'Amoxicillin',
      time: '12:10 PM',
      taken: 1,
    },
    {
      med: 'Hydrochlorothiazide',
      time: '2:00 PM',
      taken: 1,
    },
    {
      med: 'Generic Glucophage',
      time: '6:00 PM',
      taken: 1,
    },
    {
      med: 'Nexium',
      time: '10:52 PM',
      taken: 0,
    },
    {
      med: 'Abilify',
      time: '11:28 PM',
      taken: 0,
    },
  ]);
  const locale = 'en';
  const [today, setDate] = useState(new Date());
  const [nowTime, setNowTime] = useState(null);
  
  const toast = useToast();
  useEffect(() => {
    const toastMeds = (time) => {
      setInterval(() => {
        const nowMeds = meds.filter((ele) => ele.time === time);
        if (nowMeds.length > 0) {
          nowMeds.map((ele) => {
            if (!toast.isActive(`${ele.med}-${ele.time}`)) {
              return (toast({
                id: `${ele.med}-${ele.time}`,
                title: `Time to take ${ele.med}`,
                description: "Take meds in time stay healthy",
                status: "warning",
                duration: 9000,
                isClosable: true,
              }))
            }
          })
        }
        console.log(nowMeds);
      }, 10000);
    }
    const timer = setInterval(() => {
      setDate(new Date());
      const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
      setNowTime(time);
      toastMeds(time);
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [today, meds]);
  return (
    <Container maxW="400px" centerContent>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Medicine</Th>
            <Th isNumeric>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {meds.map((ele, index) => {
            if (ele.taken) {
              return (
                <Tr key={index} bg="green.200">
                  <Td>{ele.med}</Td>
                  <Td isNumeric>{ele.time}</Td>
                </Tr>
              )
            } else {
              return (
                <Tr key={index}>
                  <Td>{ele.med}</Td>
                  <Td isNumeric>{ele.time}</Td>
                </Tr>
              )
            }
          })}
        </Tbody>
      </Table>
    </Container>
  );
}

export default App;
