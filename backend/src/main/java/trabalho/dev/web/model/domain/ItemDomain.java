package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity(name = "Item")
public class ItemDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int numSerie;

    @ManyToOne
    private TituloDomain tituloDomain;

    @Column(nullable = false)
    private Date DataAquisicao;

    @Column(nullable = false)
    private String tipo;

    public TituloDomain getTituloDomain() {
        return tituloDomain;
    }

    public void setTituloDomain(TituloDomain tituloDomain) {
        this.tituloDomain = tituloDomain;
    }

    public ItemDomain() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumSerie() {
        return numSerie;
    }

    public void setNumSerie(int numSerie) {
        this.numSerie = numSerie;
    }

    public Date getDataAquisicao() {
        return DataAquisicao;
    }

    public void setDataAquisicao(Date dataAquisicao) {
        DataAquisicao = dataAquisicao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
