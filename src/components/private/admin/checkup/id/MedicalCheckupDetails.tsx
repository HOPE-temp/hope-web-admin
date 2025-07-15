// components/MedicalCheckupDetail.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Separator } from '@radix-ui/react-separator';

interface MedicalCheckupDetailProps {
  medicalCheckup: MedicalCheckup;
}

const statusColorMap: Record<
  StatusMedicalCheckup,
  'default' | 'secondary' | 'destructive'
> = {
  registered: 'default',
  completed: 'secondary',
  cancelled: 'destructive',
  in_attention: 'default',
  // agrega otros estados si tienes
};

function formatDate(dateString?: string) {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
  } catch {
    return 'N/A';
  }
}

export function MedicalCheckupDetail({
  medicalCheckup,
}: MedicalCheckupDetailProps) {
  return (
    <Card className="max-w-4xl mx-auto space-y-6 p-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle className="text-2xl font-semibold">
            {medicalCheckup.title || `Chequeo Médico #${medicalCheckup.id}`}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Creado: {formatDate(medicalCheckup.createdAt)} | Actualizado:{' '}
            {formatDate(medicalCheckup.updatedAt)}
          </CardDescription>
        </div>
        <Badge
          variant={statusColorMap[medicalCheckup.status] || 'default'}
          className="uppercase px-4 py-1 text-sm"
        >
          {medicalCheckup.status}
        </Badge>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <DetailItem label="Animal" value={medicalCheckup.animal?.nickname} />
        <DetailItem
          label="Veterinario"
          value={medicalCheckup.veterinarian?.publicInfo.username}
        />
        <DetailItem
          label="Fecha Programada"
          value={
            medicalCheckup.scheduleStartAt && medicalCheckup.scheduleEndAt
              ? `${formatDate(medicalCheckup.scheduleStartAt)} - ${formatDate(
                  medicalCheckup.scheduleEndAt
                )}`
              : 'N/A'
          }
        />
        <DetailItem
          label="Fecha Chequeo"
          value={formatDate(medicalCheckup.checkupAt)}
        />
        <DetailItem
          label="Peso (kg)"
          value={medicalCheckup.weightKg?.toFixed(2)}
        />
        <DetailItem
          label="Temperatura (°C)"
          value={medicalCheckup.temperatureC?.toFixed(2)}
        />
      </CardContent>

      <Separator />

      <Section title="Observaciones" content={medicalCheckup.observations} />
      <Section title="Diagnóstico" content={medicalCheckup.diagnosis} />
      <Section title="Tratamiento" content={medicalCheckup.treatment} />

      {medicalCheckup.checkupImageUrl && (
        <>
          <Separator />
          <section>
            <h3 className="text-lg font-semibold mb-2">Imagen del Chequeo</h3>
            <img
              src={medicalCheckup.checkupImageUrl}
              alt="Imagen chequeo médico"
              className="w-full max-h-96 object-contain rounded-md border border-muted"
              loading="lazy"
            />
          </section>
        </>
      )}
    </Card>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground">{label}</h4>
      <p className="text-base">{value ?? 'N/A'}</p>
    </div>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content?: string | null;
}) {
  if (!content) return null;
  return (
    <section>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="whitespace-pre-wrap text-base">{content}</p>
    </section>
  );
}
