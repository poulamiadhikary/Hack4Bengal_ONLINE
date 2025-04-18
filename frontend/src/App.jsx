import LandingPage from "./pages/LandingPage.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import { Routes, Route } from 'react-router-dom'
import DSAVisualizer from "./pages/visualizer/DSAVisualizer.jsx"
import LinkedList from "./pages/visualizer/LinkedList.jsx"
import Queue from "./pages/visualizer/Queue.jsx"
import Searching from "./pages/visualizer/Searching.jsx"
import Sorting from "./pages/visualizer/Sorting.jsx"
import Stack from "./pages/visualizer/Stack.jsx"
import Quiz from "./pages/Quiz.jsx"
import QuizPage from "./pages/QuizPage.jsx"
import Playground from "./pages/Playground.jsx"
import Protected from "./components/Protected.jsx"
import Roadmaps from "./pages/Roadmaps.jsx"
import RoadmapWindow from "./pages/RoadmapWindow.jsx"
import AIStudio from "./pages/ai-studio/AIStudio.jsx"
import Text from "./pages/ai-studio/Text.jsx"
import Code from "./pages/ai-studio/Code.jsx"
import Translate from "./pages/ai-studio/Translate.jsx"
import Summarize from "./pages/ai-studio/Summarize.jsx"
import Settings from "./pages/Settings.jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
        <Route path="/visualizer" element={<Protected><DSAVisualizer/></Protected>}/>
        <Route path="/visualizer/linked-list" element={<Protected><LinkedList/></Protected>}/>
        <Route path="/visualizer/queue" element={<Protected><Queue/></Protected>}/>
        <Route path="/visualizer/searching" element={<Protected><Searching/></Protected>}/>
        <Route path="/visualizer/sorting" element={<Protected><Sorting/></Protected>}/>
        <Route path="/visualizer/stack" element={<Protected><Stack/></Protected>}/>
        <Route path="/quiz" element={<Protected><Quiz/></Protected>}/>
        <Route path="/quiz/:title" element={<Protected><QuizPage/></Protected>}/>
        <Route path="/playground" element={<Protected><Playground/></Protected>}/>
        <Route path="/roadmaps" element={<Protected><Roadmaps/></Protected>}/>
        <Route path="/settings" element={<Protected><Settings/></Protected>}/>
        <Route path="/roadmaps/:title" element={<Protected><RoadmapWindow/></Protected>}/>
        <Route path="/ai-studio" element={<Protected><AIStudio/></Protected>}/>
        <Route path="/ai-studio/text" element={<Protected><Text/></Protected>}/>
        <Route path="/ai-studio/code" element={<Protected><Code/></Protected>}/>
        <Route path="/ai-studio/summarize-text" element={<Protected><Summarize/></Protected>}/>
        <Route path="/ai-studio/translate-code" element={<Protected><Translate/></Protected>}/>
      </Routes>
    </>
  )
}

export default App
