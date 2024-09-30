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
  Modal,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  useRouteLoaderData,
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom'
import { Local, Evento } from '../api/types'
import { deleteLocal } from '../api/locais'
import { useSnackbar } from '../contexts/SnackbarContext'
import { deleteEvento } from '../api/eventos'

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
    { field: 'entradas', headerName: 'Portões cadastrados' },
    { field: 'atualizacao', headerName: 'Atualização' },
  ],
  evento: [
    { field: 'nome', headerName: 'Nome' },
    { field: 'tipo', headerName: 'Tipo' },
    { field: 'Local', headerName: 'Local associado' },
    { field: 'endereco', headerName: 'Endereço' },
    { field: 'entradas', headerName: 'Portões cadastrados' },
    { field: 'data', headerName: 'Data' },
  ],
}

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

interface RowMenuProps {
  itemTipo: TableMode
  rowData: { id: number; nome: string }
}

const RowMenu: React.FC<RowMenuProps> = ({ itemTipo, rowData }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openModal, setOpenModal] = useState(false)
  const { showSnackbar } = useSnackbar()
  const { palette } = useTheme()
  const navigate = useNavigate()

  const deleteItem = async () => {
    if (itemTipo === 'local') {
      try {
        await deleteLocal(rowData.id)
        handleCloseModal()
        showSnackbar(
          'Sucesso',
          `o local "${rowData.nome}" foi apagado`,
          'success'
        )
        navigate(`/locais`, { replace: true })
      } catch (error) {
        showSnackbar('Erro', 'não foi possível apagar o local', 'error')
        console.error(error)
      }
    } else {
      try {
        await deleteEvento(rowData.id)
        handleCloseModal()
        showSnackbar(
          'Sucesso',
          `o evento "${rowData.nome}" foi apagado`,
          'success'
        )
        navigate(`/eventos`, { replace: true })
      } catch (error) {
        showSnackbar('Erro', 'não foi possível apagar o evento', 'error')
        console.error(error)
      }
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button sx={{ m: 0, p: 0, minWidth: 0 }} onClick={handleClick}>
        <MoreVertIcon style={{ color: palette.supportBlue.main }} />
      </Button>
      <Menu
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': { bgcolor: palette.surface2.main },
          '& .MuiList-root': { p: 0 },
        }}
      >
        <MenuItem
          component={RouterLink}
          to={
            itemTipo === 'local'
              ? `/locais/edit/${rowData.id}`
              : `/eventos/edit/${rowData.id}`
          }
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: lighten(palette.surface2.main, 0.05),
            },
            color: 'primary.main',
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={handleOpenModal}
          sx={{
            '&:hover': {
              backgroundColor: lighten(palette.surface2.main, 0.05),
            },
            color: 'primary.main',
          }}
        >
          Apagar
        </MenuItem>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              color: 'primary.main',
              bgcolor: 'background.default',
              borderRadius: '6px',
              boxShadow: 24,
              py: 2,
              px: 2,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              Apagar evento
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Você tem certeza que deseja apagar o evento
              <em>"{rowData.nome}"</em>?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{ textTransform: 'none', color: 'primary.main' }}
              >
                Cancelar
              </Button>
              <Button
                disableElevation
                variant="contained"
                onClick={deleteItem}
                sx={{
                  textTransform: 'none',
                  color: palette.onPrimary.main,
                  bgcolor: palette.supportBlue.main,
                }}
              >
                Apagar
              </Button>
            </Box>
          </Box>
        </Modal>
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
  rows: (Local | Evento)[]
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
                    {(() => {
                      if (
                        column.field === 'cidade_uf' &&
                        'cidade' in row &&
                        'uf' in row
                      ) {
                        return `${row.cidade}; ${row.uf}`
                      }
                      if (column.field === 'entradas' && 'entradas' in row) {
                        return (row.entradas as string[]).join(', ')
                      }
                      if (
                        column.field === 'atualizacao' &&
                        'atualizacao' in row
                      ) {
                        return new Date(row.atualizacao).toLocaleDateString()
                      }
                      if (column.field === 'data' && 'data_inicio' in row) {
                        return new Date(row.data_inicio).toLocaleDateString()
                      }
                      if (column.field === 'Local' && 'Local' in row) {
                        return (row.Local as Local).nome
                      }
                      if (column.field === 'endereco' && 'Local' in row) {
                        return (row.Local as Local).endereco
                      }
                      if (column.field === 'entradas' && 'Local' in row) {
                        return (row.Local as Local)?.entradas?.join(',') ?? ''
                      }
                      if (column.field in row && column.field !== 'Local') {
                        return row[column.field as keyof typeof row]
                      }
                      return ''
                    })()}
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="right">
                <RowMenu
                  itemTipo={tableMode}
                  rowData={{ id: row.id, nome: row.nome }}
                />
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
  const data = useRouteLoaderData('root') as {
    locais: Local[]
    eventos: Evento[]
  }
  const { locais, eventos } = data
  const [paginaAtual, setPaginaAtual] = useState(1)
  const rows = tableMode === 'local' ? locais : eventos
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
