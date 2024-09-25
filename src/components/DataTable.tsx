import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  tableCellClasses,
  Button,
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const localRows: LocalRow[] = [
  {
    id: 1,
    nome: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
  },
  {
    id: 2,
    nome: 'Alianz Parque',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
  },
  {
    id: 3,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
  },
]

const eventoRows: EventoRow[] = [
  { id: 1, nome: 'Final Copa América', tipo: 'Futebol', local: 'Morumbis' },
  {
    id: 2,
    nome: 'Semi Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
  },
  {
    id: 3,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
  },
]

interface BaseRow {
  id: number
  nome: string
}

interface LocalRow extends BaseRow {
  endereco: string
  portoes: string
}

interface EventoRow extends BaseRow {
  tipo: string
  local: string
}

type TableMode = 'local' | 'evento'

export default function DataTable({ tableMode }: { tableMode: TableMode }) {
  const rows = tableMode === 'local' ? localRows : eventoRows

  const columns =
    tableMode === 'local'
      ? ['nome', 'endereco', 'portoes']
      : ['nome', 'tipo', 'local']

  const theme = useTheme()
  const palette = theme.palette

  return (
    <TableContainer sx={{ overflow: 'hidden' }}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
            color: 'primary',
          },
        }}
      >
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '& td': {
                  overflow: 'hidden',
                  maxWidth: '5vw',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: 'primary.main',
                  pr: 1,
                },
                '&:nth-of-type(odd)': {
                  backgroundColor: palette.background.default,
                },
              }}
            >
              {columns.map((column) => (
                <TableCell key={column}>
                  {row[column as keyof typeof row]}
                </TableCell>
              ))}
              <TableCell align="right">
                <Button
                  sx={{
                    m: 0,
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  <MoreVertIcon style={{ color: palette.supportBlue.main }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
