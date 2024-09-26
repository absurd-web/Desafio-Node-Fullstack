import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  tableCellClasses,
  Button,
  TableHead,
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const localRows: LocalRow[] = [
  {
    id: 1,
    nome: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 2,
    nome: 'Alianz Parque',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 3,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 4,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 5,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
  },
  {
    id: 6,
    nome: 'Neo Química Arena',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    cidade_uf: 'São Paulo; SP',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    atualizacao: '05/10/23',
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
  cidade_uf: string
  endereco: string
  portoes: string
  atualizacao: string
}

interface EventoRow extends BaseRow {
  tipo: string
  local: string
}

type TableMode = 'local' | 'evento'

export default function DataTable({
  tableMode,
  simple = false,
}: {
  tableMode: TableMode
  simple?: boolean
}) {
  const rows = tableMode === 'local' ? localRows : eventoRows

  const columns =
    tableMode === 'local'
      ? [
          { field: 'nome', headerName: 'Nome do Local' },
          { field: 'endereco', headerName: 'Endereço' },
          { field: 'cidade_uf', headerName: 'Cidade e Estado' },
          { field: 'portoes', headerName: 'Portões cadastrados' },
          { field: 'atualizacao', headerName: 'Atualização' },
        ]
      : [
          { field: 'nome', headerName: 'Nome' },
          { field: 'tipo', headerName: 'Tipo' },
          { field: 'local', headerName: 'Local' },
        ]

  const theme = useTheme()
  const palette = theme.palette

  return (
    <>
      {simple ? (
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
              {rows.slice(0, 3).map((row) => (
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
                  {columns.slice(0, 3).map((column) => (
                    <TableCell key={column.field}>
                      {row[column.field as keyof typeof row]}
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
                      <MoreVertIcon
                        style={{ color: palette.supportBlue.main }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer sx={{ overflow: 'hidden' }}>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
                color: 'primary',
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ '& th': { color: 'primary.main' } }}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '& td': {
                      overflow: 'hidden',
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
                    <TableCell key={column.field}>
                      {row[column.field as keyof typeof row]}
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
                      <MoreVertIcon
                        style={{ color: palette.supportBlue.main }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
