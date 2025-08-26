import React, { useEffect, useState, useCallback } from 'react';
import './PositionKanban.css';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
// Si usas TypeScript, puedes definir interfaces para InterviewStep y Candidate

interface InterviewStep {
  id: string;
  name: string;
}

interface Candidate {
  id: string;
  fullName: string;
  averageScore: number;
  interviewStepId: string;
  applicationId: string;
}

const sanitizeText = (text: string) => {
  // Sanitiza texto plano para prevenir XSS (React ya lo hace, pero por seguridad extra)
  return text.replace(/[<>]/g, '');
};

const PositionKanban: React.FC = () => {
  const { id: positionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [steps, setSteps] = useState<InterviewStep[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [positionTitle, setPositionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch interview flow (steps) and position title
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setLoading(true);
        setError('');
        // El backend expone /positions/:id/interviewflow (todo en minúsculas)
  const res = await fetch(`/positions/${positionId}/interviewflow`);
        if (res.status === 404) {
          throw new Error('La posición no existe o fue eliminada.');
        }
        if (!res.ok) throw new Error('Error al cargar las fases');
        const data = await res.json();
        // El backend responde con { interviewFlow: { interviewSteps: [], ... }, positionName }
        setSteps((data.interviewFlow.interviewSteps || []).map((s: any) => ({ ...s, id: String(s.id), name: s.name })));
        setPositionTitle(data.positionName || '');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, [positionId]);

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setError('');
  const res = await fetch(`/positions/${positionId}/candidates`);
        if (res.status === 404) {
          throw new Error('No se encontraron candidatos o la posición no existe.');
        }
        if (!res.ok) throw new Error('Error al cargar candidatos');
        const data = await res.json();
        // Asegura que los ids sean string
        setCandidates((data.candidates || []).map((c: any) => ({ 
          ...c, 
          id: String(c.id), 
          interviewStepId: String(c.interviewStepId),
          applicationId: String(c.applicationId)
        })));
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchCandidates();
  }, [positionId]);

  // Agrupa candidatos por fase
  const getCandidatesByStep = useCallback(() => {
    const grouped: { [stepId: string]: Candidate[] } = {};
    steps.forEach((step) => {
      grouped[step.id] = [];
    });
    candidates.forEach((c) => {
      if (grouped[c.interviewStepId]) grouped[c.interviewStepId].push(c);
    });
    return grouped;
  }, [steps, candidates]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const candidateId = result.draggableId;
    const newStepId = result.destination.droppableId;
    const candidate = candidates.find((c) => c.id === candidateId);
    
    console.log('Drag result:', result);
    console.log('Candidate found:', candidate);
    console.log('New step ID:', newStepId);
    
    if (!candidate || candidate.interviewStepId === newStepId) return;
    
    try {
      setError('');
      const requestBody = { 
        new_interview_step: newStepId,
        applicationId: candidate.applicationId 
      };
      console.log('Request body:', requestBody);
      
  const res = await fetch(`/candidates/${candidateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        throw new Error('No se pudo actualizar la fase');
      }
      
      const responseData = await res.json();
      console.log('Success response:', responseData);
      
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === candidateId ? { ...c, interviewStepId: newStepId } : c
        )
      );
    } catch (err: any) {
      console.error('Error in onDragEnd:', err);
      setError(err.message);
    }
  };

  const groupedCandidates = getCandidatesByStep();

  // Debug logs to help diagnose kanban rendering
  console.log('KANBAN DEBUG - steps:', steps);
  console.log('KANBAN DEBUG - candidates:', candidates);
  console.log('KANBAN DEBUG - groupedCandidates:', groupedCandidates);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{sanitizeText(error)}</div>;

  const hasCandidates = candidates.length > 0;
  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver al listado de posiciones">
          ←
        </button>
        <h2>{sanitizeText(positionTitle)}</h2>
      </div>
      {!hasCandidates ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
          No hay candidatos para esta posición.
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-columns" style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
            {steps.map((step) => (
              <Droppable droppableId={step.id} key={step.id}>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                  <div
                    className={`kanban-column${snapshot.isDraggingOver ? ' dragging-over' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="kanban-column-title">{sanitizeText(step.name)}</div>
                    {groupedCandidates[step.id]?.map((candidate, idx) => (
                      <Draggable draggableId={candidate.id} index={idx} key={candidate.id}>
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                          <div
                            className={`kanban-card${snapshot.isDragging ? ' dragging' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="candidate-name">{sanitizeText(candidate.fullName)}</div>
                            <div className="candidate-score">Puntuación: {candidate.averageScore.toFixed(2)}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default PositionKanban;
