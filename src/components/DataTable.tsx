import React, { useState } from 'react'
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
  Box,
  Menu,
  MenuItem,
  lighten,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface BaseRow {
  id: number
  nome: string
  endereco: string
  portoes: string
}

interface LocalRow extends BaseRow {
  cidade_uf: string
  atualizacao: string
}

interface EventoRow extends BaseRow {
  tipo: string
  local: string
  data: string
}

type TableMode = 'local' | 'evento'

interface Column {
  field: string
  headerName: string
}

interface DataTableProps {
  tableMode: TableMode
  simple?: boolean
  searchQuery?: string
}

const ROWS_POR_PAGINA = 5

const columns: Record<TableMode, Column[]> = {
  local: [
    { field: 'nome', headerName: 'Nome do Local' },
    { field: 'endereco', headerName: 'Endereço' },
    { field: 'cidade_uf', headerName: 'Cidade e Estado' },
    { field: 'portoes', headerName: 'Portões cadastrados' },
    { field: 'atualizacao', headerName: 'Atualização' },
  ],
  evento: [
    { field: 'nome', headerName: 'Nome' },
    { field: 'tipo', headerName: 'Tipo' },
    { field: 'local', headerName: 'Local associado' },
    { field: 'endereco', headerName: 'Endereço' },
    { field: 'portoes', headerName: 'Portões cadastrados' },
    { field: 'data', headerName: 'Data' },
  ],
}

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
  {
    id: 1,
    nome: 'Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 2,
    nome: 'Semi Final Copa América',
    tipo: 'Futebol',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 3,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 4,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 5,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
  {
    id: 6,
    nome: 'Love on tour - Harry Styles',
    tipo: 'Show',
    local: 'Morumbis',
    endereco: 'Avenida Francisco Matarazzo, 1705 – Água Branca',
    portoes: `A,B,C,D,E,F,G,H,I,J,K,`,
    data: '05/10/23',
  },
]

const getTipoCellStyle = (tipo: string, palette: any) => {
  const baseStyle = {
    width: 'fit-content',
    textAlign: 'center',
    borderRadius: '6px',
    px: '6px',
    fontWeight: 'bold',
  }

  return tipo === 'Futebol'
    ? {
        ...baseStyle,
        backgroundColor: palette.onSupportBlue.main,
        color: palette.onSecondary.main,
      }
    : {
        ...baseStyle,
        backgroundColor: palette.warningSuport.main,
        color: palette.secondary.main,
      }
}

const RowMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { palette } = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button sx={{ m: 0, p: 0, minWidth: 0 }} onClick={handleClick}>
        <MoreVertIcon style={{ color: palette.supportBlue.main }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': { bgcolor: palette.surface2.main },
          '& .MuiList-root': { p: 0 },
        }}
      >
        {['Edit', 'Apagar'].map((action) => (
          <MenuItem
            key={action}
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: lighten(palette.surface2.main, 0.05),
              },
              color: 'primary.main',
            }}
          >
            {action}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const BotoesPaginacao: React.FC<{
  totalPaginas: number
  paginaAtual: number
  onPageChange: (page: number) => void
}> = ({ totalPaginas, paginaAtual, onPageChange }) => {
  if (totalPaginas <= 1) return null

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {[...Array(totalPaginas)].map((_, i) => (
        <Button
          key={i}
          onClick={() => onPageChange(i + 1)}
          sx={{
            minWidth: 0,
            py: '4px',
            px: '12px',
            bgcolor: i + 1 === paginaAtual ? 'background.default' : 'inherit',
          }}
        >
          {i + 1}
        </Button>
      ))}
    </Box>
  )
}

/**
 * Componente de conteúdo da tabela que renderiza linhas e colunas com base nos dados fornecidos.
 *
 * @param rows - Array de objetos que representam as linhas da tabela. Pode ser do tipo `LocalRow` ou `EventoRow`.
 * @param columns - Array de objetos que representam as colunas da tabela.
 * @param tableMode - Modo da tabela que pode ser 'local' ou 'evento'.
 * @param simple - (Opcional) Booleano que indica se a tabela deve ser renderizada em modo simples. O padrão é `false`.
 *
 * @returns JSX.Element - O conteúdo da tabela renderizado.
 */
const TableContent: React.FC<{
  rows: (LocalRow | EventoRow)[]
  columns: Column[]
  tableMode: TableMode
  simple?: boolean
}> = ({ rows, columns, tableMode, simple = false }) => {
  const { palette } = useTheme()
  const displayColumns = simple
    ? tableMode === 'local'
      ? [columns[0], columns[1], columns[3]]
      : columns.slice(0, 3)
    : columns

  return (
    <TableContainer sx={simple ? {} : { minHeight: '340px' }}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            maxWidth: '100px',
            borderBottom: 'none',
            color: simple ? 'primary.main' : palette.onSupportBlue.main,
          },
        }}
      >
        {!simple && (
          <TableHead>
            <TableRow sx={{ '& th': { color: 'primary.main' } }}>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: palette.background.default,
                },
              }}
            >
              {displayColumns.map((column) => (
                <TableCell key={column.field}>
                  <Typography
                    noWrap
                    sx={
                      tableMode === 'evento' &&
                      column.field === 'tipo' &&
                      'tipo' in row
                        ? getTipoCellStyle(row.tipo, palette)
                        : {}
                    }
                  >
                    {row[column.field as keyof typeof row]}
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="right">
                <RowMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

/**
 * Componente DataTable.
 *
 * @param {DataTableProps} props - As propriedades do componente.
 * @param {'local' | 'evento'} props.tableMode - Modo da tabela, pode ser 'local' ou 'evento'.
 * @param {boolean} [props.simple=false] - Define se a tabela deve ser exibida em modo simples.
 * @param {string} [props.searchQuery] - A string de busca para filtrar as linhas da tabela.
 *
 * @returns {JSX.Element} O componente DataTable.
 *
 * O DataTable exibe uma tabela com dados paginados. Se o modo simples estiver ativado,
 * apenas as três primeiras linhas serão exibidas. Caso contrário, a tabela exibirá as
 * linhas de acordo com a paginação.
 */
const DataTable: React.FC<DataTableProps> = ({
  tableMode,
  simple = false,
  searchQuery,
}) => {
  const [paginaAtual, setPaginaAtual] = useState(1)
  const rows = tableMode === 'local' ? localRows : eventoRows
  const totalPaginas = Math.ceil(rows.length / ROWS_POR_PAGINA)
  /* Pesquisa por nome */
  const regex = searchQuery ? new RegExp(searchQuery, 'i') : null
  const rowsFiltrados = rows.filter((row) => {
    if (!regex) return true
    return regex.test(row.nome)
  })
  const totalResultados = rowsFiltrados.length
  const rowsPaginados = rowsFiltrados.slice(
    ROWS_POR_PAGINA * (paginaAtual - 1),
    ROWS_POR_PAGINA * paginaAtual
  )

  return (
    <>
      {searchQuery && (
        <Typography
          sx={{ color: 'primary.main', fontStyle: 'italic', fontSize: '14px' }}
        >
          {totalResultados.toString().padStart(2, '0')} Resultados encontrados
          para "{searchQuery}"
        </Typography>
      )}
      <TableContent
        rows={simple ? rows.slice(0, 3) : rowsPaginados}
        columns={columns[tableMode]}
        tableMode={tableMode}
        simple={simple}
      />
      {!simple && (
        <BotoesPaginacao
          totalPaginas={totalPaginas}
          paginaAtual={paginaAtual}
          onPageChange={setPaginaAtual}
        />
      )}
    </>
  )
}

export default DataTable
