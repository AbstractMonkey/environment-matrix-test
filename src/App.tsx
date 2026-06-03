import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TierPage from './pages/TierPage'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import KnotsPage from './pages/KnotsPage'
import { AnatomyPage, PointsPage } from './pages/ToolPages'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tier/:tierId" element={<TierPage />} />
        <Route path="/tier/:tierId/quiz" element={<QuizPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/anatomy" element={<AnatomyPage />} />
        <Route path="/points-of-sail" element={<PointsPage />} />
        <Route path="/knots" element={<KnotsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
